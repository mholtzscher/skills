# sqlc, Goose, Repositories, and Transactions

Read this reference when changing schema, SQL queries, generated data access, repositories, or transactional use cases.

## Root sqlc configuration

Keep `sqlc.yaml` at the project root:

```yaml
version: "2"
sql:
  - engine: "postgresql"
    schema: "internal/platform/db/migrations"
    queries: "internal/platform/db/queries"
    gen:
      go:
        package: "sqlc"
        out: "internal/platform/db/sqlc"
        sql_package: "pgx/v5"
        emit_interface: true
        query_parameter_limit: 0
```

`query_parameter_limit: 0` generates parameter structs for every query, which makes larger call sites explicit and stable. Add other generation options only when the project requires them.

## Ownership and data flow

```text
goose migrations
  -> database schema
  -> sqlc schema input
  -> generated Go query package
  -> module repository adapter
  -> module service
  -> Huma handler
```

Ownership:

- `internal/platform/db/migrations`: goose schema changes;
- `internal/platform/db/queries`: sqlc query sources, usually named by module/resource;
- `internal/platform/db/sqlc`: generated package;
- `internal/modules/<module>/repository.go`: adapter from generated rows/params to domain types;
- `internal/modules/<module>/service.go`: business use cases depending on a repository seam;
- `internal/modules/<module>/api`: transport only.

Migrations are the schema source of truth. Never hand-edit generated sqlc files.

## Migration example

```sql
-- +goose Up
CREATE TABLE users (
  id text PRIMARY KEY,
  email text NOT NULL UNIQUE,
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- +goose Down
DROP TABLE users;
```

Use ordered, immutable migration files appropriate to the project's migration policy. Verify migration execution from an empty database.

## Query example

```sql
-- name: GetUser :one
SELECT id, email, name, created_at
FROM users
WHERE id = $1;

-- name: CreateUser :one
INSERT INTO users (id, email, name)
VALUES ($1, $2, $3)
RETURNING id, email, name, created_at;
```

Keep SQL near database infrastructure while preserving module/resource naming. Generated query code is an implementation detail, not the domain model.

## Repository seam

A service-facing repository can be narrow and domain-oriented:

```go
type Repository interface {
    FindByID(ctx context.Context, id string) (*User, error)
    Create(ctx context.Context, user *User) error
    Update(ctx context.Context, user *User) error
}
```

Concrete sqlc adapter:

```go
package users

import (
    "context"
    "my-api/internal/platform/db/sqlc"
)

type SQLRepository struct {
    q *sqlc.Queries
}

func NewSQLRepository(q *sqlc.Queries) *SQLRepository {
    return &SQLRepository{q: q}
}

func (r *SQLRepository) FindByID(
    ctx context.Context,
    id string,
) (*User, error) {
    row, err := r.q.GetUser(ctx, sqlc.GetUserParams{ID: id})
    if err != nil {
        return nil, err
    }

    return &User{
        ID:        row.ID,
        Email:     row.Email,
        Name:      row.Name,
        CreatedAt: row.CreatedAt,
    }, nil
}
```

The adapter should:

- translate generated params and rows;
- map persistence-specific errors to domain errors where meaningful;
- preserve context cancellation;
- avoid leaking sqlc types through its interface.

A repository interface is unnecessary when no consumer needs that seam. Add one because it supports domain-oriented operations, transaction orchestration, or needed tests—not because every repository must have one.

## Transactions

For a real multi-step write, let the service coordinate the use case through a consumer-owned transaction seam. Pass domain-oriented repositories into the callback so sqlc and pgx stay out of the service:

```go
type Transactor interface {
    WithinTransaction(
        ctx context.Context,
        fn func(Repository) error,
    ) error
}

type Service struct {
    repo Repository
    tx   Transactor
}

func NewService(repo Repository, tx Transactor) *Service {
    return &Service{repo: repo, tx: tx}
}

func (s *Service) RenameUser(
    ctx context.Context,
    id string,
    name string,
) error {
    return s.tx.WithinTransaction(ctx, func(repo Repository) error {
        user, err := repo.FindByID(ctx, id)
        if err != nil {
            return err
        }

        user.Name = name
        return repo.Update(ctx, user)
    })
}
```

Implement that seam with the pgx pool and transaction-bound sqlc queries:

```go
type SQLTransactor struct {
    pool *pgxpool.Pool
}

func NewSQLTransactor(pool *pgxpool.Pool) *SQLTransactor {
    return &SQLTransactor{pool: pool}
}

func (t *SQLTransactor) WithinTransaction(
    ctx context.Context,
    fn func(Repository) error,
) error {
    tx, err := t.pool.Begin(ctx)
    if err != nil {
        return fmt.Errorf("begin transaction: %w", err)
    }
    defer tx.Rollback(ctx)

    repo := NewSQLRepository(sqlc.New(tx))
    if err := fn(repo); err != nil {
        return err
    }
    if err := tx.Commit(ctx); err != nil {
        return fmt.Errorf("commit transaction: %w", err)
    }
    return nil
}
```

For a transaction spanning multiple repositories, pass a purpose-built set of domain interfaces to the callback. Do not expose `*sqlc.Queries` to the service or add a generic unit-of-work abstraction before a real use case requires it.

## Persistence review checklist

- Migration and query sources—not generated files—were edited.
- sqlc generation is reproducible from root configuration.
- Generated types stop at the repository adapter.
- Services depend on domain-oriented operations.
- Persistence errors are translated deliberately.
- Multi-step writes have explicit transaction ownership.
- Repository and migration behavior is tested against a real/disposable database where needed.

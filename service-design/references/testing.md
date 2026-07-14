# Testing Strategy

Read this reference when deciding test level, placing tests, or verifying generated code.

## Match tests to risk

### Service tests

Test business behavior without HTTP. Inject repositories/providers through the module seam. These tests should not require Huma and usually should not require a database.

### Repository tests

Exercise the concrete sqlc adapter against a real or disposable database:

1. create the database;
2. apply goose migrations;
3. construct `sqlc.Queries`;
4. construct the module repository;
5. verify domain-facing behavior and error mapping.

This validates the same schema and generated code used by the application.

### Migration tests

Start from an empty database and apply all goose migrations. Use these tests to catch invalid ordering, missing extensions, incompatible SQL, and drift between migration assumptions.

### Huma API tests

Test risks owned by transport:

- route and method registration;
- path/query/header/body validation;
- status codes;
- response bodies and headers;
- authentication/middleware policy where applicable;
- operation IDs, tags, summaries, and other OpenAPI metadata.

Avoid re-testing service business logic through every handler.

### Contract tests

When external consumers depend on compatibility, export OpenAPI and compare it intentionally. Store approved artifacts or fixtures under `api/` when useful.

## Test locality

Keep tests with the module that owns the behavior:

```text
internal/modules/users/
  service_test.go
  repository_test.go
  api_test.go
```

Tests may live inside a subpackage such as `api` or a provider adapter when they need package-local behavior. Choose locality over a global test taxonomy.

## Generated-code verification

CI should regenerate sqlc output and fail when the working tree changes. A typical flow is:

```sh
sqlc generate
git diff --exit-code -- internal/platform/db/sqlc
go test ./...
go vet ./...
```

Use the repository's own command runner when present. Do not manually patch generated output to make the check pass.

For the architectural review gate, use the "Review gate" questions in SKILL.md.

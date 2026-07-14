# Layout and Ownership

Read this reference when placing a package, adding or splitting a module, or reviewing architecture.

## Module-based layout

```text
my-api/
  sqlc.yaml

  cmd/
    api/
      main.go

  internal/
    app/
      server.go
      config.go
      lifecycle.go

    platform/
      db/
        postgres.go
        migrate.go
        migrations/
          20260706120000_create_users.sql
          20260706121000_create_projects.sql
        queries/
          users.sql
          projects.sql
          billing.sql
        sqlc/
          db.go
          models.go
          querier.go
          users.sql.go
          projects.sql.go
      logger/
      auth/

    modules/
      users/
        api/
          routes.go
          inputs.go
          outputs.go
          handlers.go
        service.go
        repository.go
        model.go
        errors.go
        service_test.go
        api_test.go

      billing/   # same shape as users
      projects/  # same shape as users

    shared/
      pagination/
      validation/
      httperrors/
      ids/

  api/
    openapi.yaml
    clients/

  deployments/
    Dockerfile
    compose.yaml
    k8s/

  go.mod
  go.sum
```

The tree is a responsibility map, not mandatory scaffolding. Create directories when they gain a real owner and contents.

## Responsibilities

### `sqlc.yaml`

Keep sqlc configuration at the root so local commands and CI have one obvious execution point. Schema inputs should point at goose migrations, query inputs at shared SQL query files, and generated output at the platform database package. See [persistence.md](persistence.md) for the concrete configuration.

### `cmd/api`

Keep the executable thin:

- obtain process-level inputs;
- invoke application startup;
- report startup or shutdown failures.

Do not select product implementations or construct the application dependency graph here. Route registration and business behavior do not belong here.

### `internal/app`

Application assembly is the composition root. It loads application configuration, initializes infrastructure clients, selects concrete adapters, wires services and transports, constructs Chi/Huma, registers modules, and coordinates lifecycle behavior.

Typical files:

- `server.go`: Chi router, Huma API, middleware, route groups, module registration;
- `config.go`: application configuration and loading;
- `lifecycle.go`: startup and shutdown coordination.

### `internal/platform`

Platform packages provide domain-neutral infrastructure used across modules:

- database connections and migration execution;
- logging;
- authentication/JWT mechanics;
- metrics and tracing;
- queues and caches;
- generic external-service clients.

Platform code should not encode users, billing, projects, or other product rules. A vendor adapter with domain vocabulary generally belongs to its module instead.

### `internal/modules`

Each product/domain area owns:

- domain types and errors;
- business use cases;
- persistence/provider seams and module-specific adapters;
- Huma transport registration and models;
- tests.

A representative module:

```text
internal/modules/users/
  api/
    routes.go
    inputs.go
    outputs.go
    handlers.go
  service.go
  repository.go
  model.go
  errors.go
```

Keep a small module flat. When `service.go` becomes difficult to navigate, split by use case:

```text
users/
  create.go
  get.go
  update.go
  delete.go
  repository.go
  model.go
```

Split because responsibilities change independently, not to create symmetry.

### `internal/modules/<module>/api`

This is the Huma-facing transport package. It may import Huma; the service normally should not.

Typical ownership:

- `routes.go`: operations and groups;
- `inputs.go`: path/query/header/body transport structs and validation tags;
- `outputs.go`: status, headers, and response bodies;
- `handlers.go`: transport-to-service translation.

A compact module may combine these while the result remains easier to navigate.

### `internal/platform/db`

Keep connection setup, goose migrations, SQL query files, and generated sqlc output close together. Modules use generated queries through repository adapters; handlers and services should not speak sqlc directly.

### `internal/shared`

Use only for small, genuinely domain-neutral behavior such as pagination primitives, validation helpers, HTTP error helpers, ID parsing, or time utilities. If a package accumulates product knowledge, move it back to the owning module.

### `api`

Optional public contract artifacts:

- exported OpenAPI documents;
- generated clients/SDKs;
- API examples;
- contract fixtures.

Do not confuse this directory with runtime handlers.

### `deployments`

Runtime and deployment assets belong here: Dockerfiles, Compose definitions, Kubernetes manifests, Helm charts, and local service definitions.

## Growing a module

Keep a module internally flat while its concepts, dependencies, and tests remain cohesive. Introduce a nested capability when it has distinct business rules or providers, can expose a narrow module boundary, and changes independently enough that the separation improves navigation.

Do not split merely because a module has many files, exposes several endpoints, or could be made visually symmetrical with another module. The goal is obvious ownership, not maximum directory depth.

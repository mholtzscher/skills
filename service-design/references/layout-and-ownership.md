# Layout and Ownership

Read this reference when placing a package, organizing transport files, adding or splitting a module, or reviewing architecture.

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
          register.go
          handler.go
          get_user.go
          create_user.go
          user_models.go
          user_mapping.go
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

Application assembly is the composition root. It loads application configuration, initializes infrastructure clients, selects concrete adapters, wires services and transports, constructs Echo/Huma, registers modules, and coordinates lifecycle behavior.

Typical files:

- `server.go`: Echo router, Huma API, middleware, route groups, module registration;
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
- transport registration and protocol-specific models;
- tests.

A representative module:

```text
internal/modules/users/
  api/
    register.go
    handler.go
    get_user.go
    create_user.go
    user_models.go
    user_mapping.go
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

This example uses `api` for HTTP. Follow repository package names; independent HTTP and MCP adapters may instead be sibling `httpapi` and `mcpapi` packages. Each owns its models, mappings, registration, errors, and consumed service interfaces. Both call the domain services rather than importing one another. Generic transport infrastructure belongs in platform; product tool names and contracts stay module-owned.

### Operation-local transport files

Repository coding standards take precedence. Otherwise, use one operation per file for new or reorganized HTTP/MCP transport code: keep registration metadata, input/output wrappers, the handler, and helpers used only by that operation together. This gives a reader one place to inspect an operation's public contract and service translation.

| File | Responsibility |
|---|---|
| `register.go` | One public `Register` constructs handlers and explicitly calls private operation registrars. Optional private registration groups compose calls, not operation metadata or handler bodies. |
| `handler.go` | Private handler structs and their required dependencies, including consumer-owned interfaces when a seam is justified. |
| `<operation>.go` | Private `register<Operation>`, route/tool metadata and contract selection, input/output wrappers, handler, and operation-only validation, mapping, or schema preparation. |
| `<resource>_models.go` | Payload types actually reused by multiple operations in this protocol package. |
| `<resource>_mapping.go` | Reused domain-to-protocol mappings. |
| `<resource>_contracts.go` | Reused schema fragments, preparation getters, and validation contracts, when needed; preserve their preparation lifetime. |
| `errors.go` | Common protocol-specific error translation; operation-only handling stays with the operation. |

Name operation files after the explicit HTTP operation ID or MCP tool name in `snake_case`: `get-user` or `get_user` becomes `get_user.go` in its own protocol package. The package provides protocol qualification; HTTP and MCP need not have matching operations, files, or payloads. Moving declarations must preserve existing wire contracts and published schema names.

Keep operation-only declarations local until another operation needs them. Extract actual reuse into resource-named support files or helpers named for a concrete responsibility, rather than splitting every operation across package-wide input, model, and handler catalogs. Create files only when they have content; use explicit registration rather than automatic discovery or `init` registries. A file per operation does not imply a package or service per operation.

A module registration function may accept multiple service dependencies while their handlers, interfaces, and lifecycle policies stay separate. Keep transport-framework dependencies out of services. For a concrete Huma example, read [huma-transport.md](huma-transport.md#module-owned-registration).

Apply the convention within the requested change. Preserve an established repository layout unless the user authorizes a migration; do not sweep unrelated code or reorganize generated/platform internals to match this module transport example.

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

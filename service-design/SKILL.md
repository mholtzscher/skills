---
name: service-design
description: Apply a consistent blueprint when designing, scaffolding, reviewing, or refactoring modular Go services. Use whenever deciding product boundaries, package ownership, application assembly, HTTP transport organization, handler/service/repository seams, persistence, transactions, external providers, error mapping, API models, generated code, testing strategy, or whether a service has outgrown a flat layout—even if the user only asks to add an endpoint, repository, or provider. Includes concrete guidance for services using Chi, Huma, sqlc, goose, PostgreSQL, and pgx.
---

# Service Design

Design services around clear product ownership, explicit dependency direction, and business behavior that is testable independently of delivery and infrastructure concerns. Treat the Chi/Huma HTTP stack, persistence tools such as sqlc, and external vendors as components within that design—not as the application architecture.

## Workflow

### 1. Inspect before designing

Read the repository tree, `go.mod`, application entry point, transport construction, one representative module, persistence configuration, tests, and repository guidance such as `AGENTS.md`.

State assumptions and identify whether the task is:

- adding behavior within an existing module;
- introducing a new product module;
- adding a transport, persistence, or vendor adapter;
- correcting ownership/dependency drift;
- deciding whether an existing module needs an internal capability boundary.

Do not impose the example tree mechanically. Existing explicit project decisions take precedence unless the user asks to change them.

### 2. Choose the appropriate module shape

Use product modules as the primary ownership boundary. Keep each module internally flat until distinct business rules, dependencies, or independent change pressure justify a nested capability. Split `service.go` by use case, or separate transport/mapping files, only after size or independent change pressure justifies it. Read [layout-and-ownership.md](references/layout-and-ownership.md) when adding or splitting modules, moving packages, or reviewing ownership.

### 3. Assign one owner

Classify each change before selecting a path:

| Concern | Owner |
|---|---|
| Executable startup | `cmd/<command>` |
| Config, dependency assembly, router, lifecycle | `internal/app` |
| Product behavior and domain types | `internal/modules/<module>` |
| HTTP request/response models, handlers, and routes | `internal/modules/<module>/api` |
| Shared domain-neutral infrastructure | `internal/platform` |
| Tiny genuinely domain-neutral helpers | `internal/shared` |
| Public OpenAPI/client artifacts | `api` |
| Runtime/deployment assets | `deployments` |

Keep code in the narrowest owner that can explain it. A vendor adapter that understands one domain normally belongs to that module; a generic database pool or queue client belongs to platform. Treat `internal/shared` as a last resort, not an intake queue.

Use manual constructor injection. `internal/app` is the composition root: it selects concrete implementations, constructs the dependency graph, and passes required dependencies explicitly through constructors or registration functions. Avoid package-level mutable dependencies, service locators, and DI frameworks unless the project explicitly requires them.

### 4. Preserve dependency direction

Aim for this recognizable flow (the persistence-side equivalent, goose to sqlc to repository to domain, is in [persistence.md](references/persistence.md)):

```text
HTTP request
  -> transport validation and API model
  -> thin module handler
  -> service/use case
  -> repository or provider seam
  -> sqlc/vendor adapter
```

Keep transport-framework types out of services. Keep sqlc and vendor models out of domain interfaces and public responses. Map errors at the seam where their meaning changes.

### 5. Add only justified seams

Start with concrete dependencies. Introduce an interface only when the current change needs one to:

- isolate an external system or generated implementation;
- let a use case depend on behavior owned by another layer;
- coordinate multiple operations within a transaction; or
- replace a dependency in a test where using the concrete implementation would make the test slow, unreliable, or infrastructure-dependent.

Pass required dependencies explicitly through constructors. When a dependency has a justified seam, define its interface in the consuming package and include only the methods that consumer needs. Otherwise, accept the concrete type directly. Constructors should normally return concrete implementations.

Do not add an interface solely because an implementation exists, because a mock could be generated, or because a layered architecture commonly includes one. Before adding a seam, name the current consumer and the concrete problem the seam solves.

### 6. Implement the affected layer

- For HTTP transport implemented with Chi and Huma—including router construction, routes, handlers, groups, inputs/outputs, OpenAPI metadata, or HTTP error mapping—read [huma-transport.md](references/huma-transport.md).
- For migrations, queries, sqlc generation, repositories, pgx, or transactions, read [persistence.md](references/persistence.md).
- For test placement or generated-code checks, read [testing.md](references/testing.md).

Read multiple references when a feature crosses seams. For example, a new persisted endpoint requires transport, persistence, and testing guidance.

### 7. Verify where the risk actually lives

Run focused tests first, then the repository's broad checks. Verify generated code when schema/query inputs change. Use a real or disposable database for persistence behavior that mocks cannot establish. Check exported OpenAPI when compatibility matters.

## Review gate

Before finishing, answer:

1. Can business behavior be tested without the HTTP transport?
2. Do handlers translate rather than decide business behavior?
3. Do domain/public types avoid sqlc and vendor leakage?
4. Does each module register its own operations?
5. Is Chi/Huma construction centralized in application assembly?
6. Are required dependencies passed explicitly, with concrete implementations selected only in application assembly?
7. Is shared code truly domain-neutral and used by more than one owner?
8. Did the change add only abstractions justified by current needs?
9. Are tests located with the behavior and aimed at the actual risk?

If an answer is no, either correct it or explain the deliberate project-specific exception. Seam-specific checks (persistence, transport) live in the checklists at the end of their reference files—apply the ones for any reference you read.

## Change discipline

Apply this architecture surgically. Correct confirmed drift, but do not reorganize unrelated working code for visual conformity. Prefer boring package names, fewer abstractions, and ownership that a new contributor can infer from the tree.

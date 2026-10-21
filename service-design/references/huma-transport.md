# HTTP Transport with Echo and Huma

Read this reference when constructing the Echo/Huma server, registering routes, defining transport models, writing handlers, or mapping HTTP errors.

## Centralize Echo and Huma construction

Use Echo v5 as the HTTP router and Huma as the API transport layer. Construct both in application assembly so modules depend on `huma.API` rather than Echo directly. Keep public Echo routes outside authenticated Huma groups, and make each route group's authentication policy explicit.

```go
package app

import (
    "net/http"

    "github.com/danielgtaylor/huma/v2"
    "github.com/danielgtaylor/huma/v2/adapters/humaecho"
    "github.com/labstack/echo/v5"
    echomiddleware "github.com/labstack/echo/v5/middleware"

    "my-api/internal/modules/users"
    usersapi "my-api/internal/modules/users/api"
)

type Deps struct {
    Users *users.Service
}

func NewServer(deps Deps) http.Handler {
    router := echo.New()
    router.Use(echomiddleware.RequestID())
    router.GET("/healthz", healthHandler)

    api := humaecho.New(router, huma.DefaultConfig("My API", "1.0.0"))

    usersGroup := huma.NewGroup(api, "/v1/users")
    usersGroup.UseMiddleware(authMiddleware)
    usersGroup.UseSimpleModifier(huma.OperationTags("Users"))
    usersapi.Register(usersGroup, deps.Users)

    return router
}
```

Keep the concrete Echo/Huma integration and cross-module policy at this composition seam. Product modules register their operations on the group they receive without knowing which Echo instance hosts the Huma API or inferring policy from URL prefixes.

## Module-owned registration

Follow the repository's coding standards. The default [operation-local layout](layout-and-ownership.md#operation-local-transport-files) keeps one operation's registration, wrappers, handler, and local helpers in its named file. The examples below show a module exposing `get-user`; other operations add their own registrars and files.

`handler.go` owns the private handler and its dependencies. This example uses the concrete service; define a consumer-owned interface here only when the task needs that seam.

```go
package api

import "my-api/internal/modules/users"

type handler struct {
    users *users.Service
}
```

`register.go` is the explicit complete catalog, not the owner of every operation's metadata:

```go
package api

import (
    "github.com/danielgtaylor/huma/v2"
    "my-api/internal/modules/users"
)

func Register(group huma.API, svc *users.Service) {
    h := &handler{users: svc}
    registerGetUser(group, h)
}
```

`get_user.go` owns this operation's contract and service translation:

```go
package api

import (
    "context"
    "errors"
    "net/http"

    "github.com/danielgtaylor/huma/v2"
    "my-api/internal/modules/users"
)

type GetUserInput struct {
    ID string `path:"id" doc:"User ID"`
}

type UserBody struct {
    ID    string `json:"id" example:"usr_123"`
    Email string `json:"email" format:"email"`
    Name  string `json:"name"`
}

type GetUserOutput struct {
    Body UserBody
}

func registerGetUser(group huma.API, h *handler) {
    huma.Register(group, huma.Operation{
        OperationID: "get-user",
        Method:      http.MethodGet,
        Path:        "/{id}",
        Summary:     "Get user",
        Errors:      []int{http.StatusNotFound, http.StatusInternalServerError},
    }, h.getUser)
}

func (h *handler) getUser(
    ctx context.Context,
    input *GetUserInput,
) (*GetUserOutput, error) {
    user, err := h.users.Get(ctx, input.ID)
    if errors.Is(err, users.ErrUserNotFound) {
        return nil, huma.Error404NotFound("user not found")
    }
    if err != nil {
        return nil, huma.Error500InternalServerError("internal server error")
    }

    return &GetUserOutput{Body: UserBody{
        ID:    user.ID.String(),
        Email: user.Email,
        Name:  user.Name,
    }}, nil
}
```

Keep `UserBody`, mapping, and error classification here while only this operation uses them. When another operation actually reuses those definitions, extract `user_models.go`, `user_mapping.go`, or `errors.go` within this protocol package as appropriate.

Keep operation-specific schema/validation helpers beside the operation too. Reused schema fragments or preparation belong in `user_contracts.go` when needed, without changing their preparation lifetime. One public `Register` may accept separate service dependencies without merging their use cases or lifecycle policies. A sibling MCP adapter follows the same file convention but owns its own tool contracts and mappings.

## Route groups

Use groups for:

- version prefixes;
- module/resource prefixes;
- admin or internal route families;
- middleware shared by a route family;
- tags, metadata, or response transformers.

Application assembly creates groups when it owns cross-module path, authentication, tags, or other policy; modules still own their operation registration. Give every operation a stable explicit operation ID and human-readable summary so generated OpenAPI remains intentional and testable.

## Explicit input and output models

Use explicit transport structs as in `get_user.go` above. Huma inputs may describe path, query, header, and body values. Outputs may describe status, headers, and response bodies. Keep these separate from domain or database types when shapes differ—which should be the default assumption for public contracts. Operation-specific wrappers stay with their handler; only actual multi-operation payload reuse belongs in resource-named model files.

This separation allows API versions, domain concepts, and persistence schemas to evolve independently.

## Thin handlers

Handlers translate transport input into a use-case call and map the result back into transport output, as `getUser` does above. Keep the handler with the operation rather than moving all handlers into a package-wide catalog.

Huma constructs and validates the input before calling the handler. Do not repeat transport validation unless enforcing a business invariant.

Handlers should not contain business rules or direct sqlc/vendor calls. Services should remain testable without Huma or HTTP.

## Module service shape

A cohesive module service can group related use cases:

```go
package users

type Service struct {
    repo Repository
}

func NewService(repo Repository) *Service {
    return &Service{repo: repo}
}

func (s *Service) Get(ctx context.Context, id string) (*User, error) {
    return s.repo.FindByID(ctx, id)
}
```

Split by use case as the module grows; do not create one class/package per operation preemptively.

## Domain errors versus HTTP errors

Domain errors belong to the module:

```go
var (
    ErrUserNotFound = errors.New("user not found")
    ErrEmailTaken   = errors.New("email already taken")
)
```

Map them at the transport seam. When several operations share the classification, `errors.go` can own it:

```go
func mapError(err error) error {
    switch {
    case errors.Is(err, users.ErrUserNotFound):
        return huma.Error404NotFound("user not found")
    case errors.Is(err, users.ErrEmailTaken):
        return huma.Error409Conflict("email already taken")
    default:
        return huma.Error500InternalServerError("internal server error")
    }
}
```

Do not make services return Huma errors. Preserve error identity with wrapping so `errors.Is` remains useful. Avoid leaking internal provider/database details in public messages.

## Transport review checklist

- Echo and Huma construction is centralized.
- Every module owns operation registration with stable IDs and summaries.
- The explicit catalog delegates to operation-local registrars; metadata, wrappers, handlers, and operation-only helpers stay together under the repository's convention.
- Application assembly applies explicit auth and metadata policy to groups.
- Public Echo routes remain outside authenticated Huma groups.
- Inputs and outputs are explicit transport types.
- Handlers translate; services decide.
- Domain errors become HTTP errors only at transport.
- Domain and persistence/vendor models are not reused as public output by default.

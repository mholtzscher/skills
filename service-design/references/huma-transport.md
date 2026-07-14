# HTTP Transport with Chi and Huma

Read this reference when constructing the Chi/Huma server, registering routes, defining transport models, writing handlers, or mapping HTTP errors.

## Centralize Chi and Huma construction

Use Chi as the HTTP router and Huma as the API transport layer. Construct both in application assembly so modules depend on `huma.API` rather than Chi directly. Keep public Chi routes outside authenticated Huma groups, and make each route group's authentication policy explicit.

```go
package app

import (
    "net/http"

    "github.com/danielgtaylor/huma/v2"
    "github.com/danielgtaylor/huma/v2/adapters/humachi"
    "github.com/go-chi/chi/v5"

    "my-api/internal/modules/users"
    usersapi "my-api/internal/modules/users/api"
)

type Deps struct {
    Users *users.Service
}

func NewServer(deps Deps) http.Handler {
    router := chi.NewRouter()
    router.Use(requestIDMiddleware)
    router.Get("/healthz", healthHandler)

    api := humachi.New(router, huma.DefaultConfig("My API", "1.0.0"))

    usersGroup := huma.NewGroup(api, "/v1/users")
    usersGroup.UseMiddleware(authMiddleware)
    usersGroup.UseSimpleModifier(huma.OperationTags("Users"))
    usersapi.Register(usersGroup, deps.Users)

    return router
}
```

Keep the concrete Chi/Huma integration and cross-module policy at this composition seam. Product modules register their operations on the group they receive without knowing which router hosts the Huma API or inferring policy from URL prefixes.

## Module-owned registration

Each module registers its own operations:

```go
package api

import (
    "net/http"

    "github.com/danielgtaylor/huma/v2"
    "my-api/internal/modules/users"
)

type Handler struct {
    users *users.Service
}

func Register(group huma.API, svc *users.Service) {
    h := &Handler{users: svc}

    huma.Register(group, huma.Operation{
        OperationID: "get-user",
        Method:      http.MethodGet,
        Path:        "/{id}",
        Summary:     "Get user",
    }, h.GetUser)
    huma.Register(group, huma.Operation{
        OperationID: "create-user",
        Method:      http.MethodPost,
        Path:        "",
        Summary:     "Create user",
    }, h.CreateUser)
    huma.Register(group, huma.Operation{
        OperationID: "update-user",
        Method:      http.MethodPatch,
        Path:        "/{id}",
        Summary:     "Update user",
    }, h.UpdateUser)
}
```

Use groups for:

- version prefixes;
- module/resource prefixes;
- admin or internal route families;
- middleware shared by a route family;
- tags, metadata, or response transformers.

Application assembly creates groups when it owns cross-module path, authentication, tags, or other policy; modules still own their operation registration. Give every operation a stable explicit operation ID and human-readable summary so generated OpenAPI remains intentional and testable.

## Explicit input and output models

Use explicit transport structs:

```go
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
```

Huma inputs may describe path, query, header, and body values. Outputs may describe status, headers, and response bodies. Keep these separate from domain or database types when shapes differ—which should be the default assumption for public contracts.

This separation allows API versions, domain concepts, and persistence schemas to evolve independently.

## Thin handlers

Handlers translate transport input into a use-case call and map the result back into transport output:

```go
func (h *Handler) GetUser(
    ctx context.Context,
    input *GetUserInput,
) (*GetUserOutput, error) {
    user, err := h.users.Get(ctx, input.ID)
    if err != nil {
        return nil, mapError(err)
    }

    return &GetUserOutput{Body: UserBody{
        ID:    user.ID.String(),
        Email: user.Email,
        Name:  user.Name,
    }}, nil
}
```

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

Map them at the transport seam:

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

- Chi and Huma construction is centralized.
- Every module owns operation registration with stable IDs and summaries.
- Application assembly applies explicit auth and metadata policy to groups.
- Public Chi routes remain outside authenticated Huma groups.
- Inputs and outputs are explicit transport types.
- Handlers translate; services decide.
- Domain errors become HTTP errors only at transport.
- Domain and persistence/vendor models are not reused as public output by default.

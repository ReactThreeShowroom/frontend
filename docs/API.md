<!-- markdownlint-configure-file { "no-inline-html": { "allowed_elements": [ "br" ] } } -->

# API Docs

[Back to Main README](../README.md)

- [API Docs](#api-docs)
  - [CLIENT ROUTE](#client-route)
    - [GET ALL CLIENTS BY USER ID](#get-all-clients-by-user-id)
    - [CREATE CLIENT](#create-client)
    - [GET ONE CLIENT](#get-one-client)
    - [GET INACTIVE CLIENTS](#get-inactive-clients)
    - [UPDATE OR REACTIVATE CLIENT](#update-or-reactivate-client)
    - [DELETE CLIENT (deactivate)](#delete-client-deactivate)
  - [FAVORITE ROUTE](#favorite-route)
    - [GET ALL FAVORITES](#get-all-favorites)
    - [GET FAVORITE BY ID](#get-favorite-by-id)
    - [GET ALL COLORS](#get-all-colors)
    - [GET COLOR BY ID](#get-color-by-id)
    - [GET COLOR BY NAME](#get-color-by-name)
    - [GET COLOR BY CODE](#get-color-by-code)
    - [GET ALL ITEMS](#get-all-items)
    - [GET ITEM BY ID](#get-item-by-id)
    - [GET ITEM BY NAME](#get-item-by-name)
    - [GET ITEM BY TYPE](#get-item-by-type)
    - [GET ITEM BY SUBTYPE](#get-item-by-subtype)
    - [GET ALL PATTERNS](#get-all-patterns)
    - [GET PATTERN BY ID](#get-pattern-by-id)
    - [GET PATTERN BY NAME](#get-pattern-by-name)
  - [USER ROUTE](#user-route)
    - [GET ALL USERS (admin)](#get-all-users-admin)
    - [GET ONE USER (admin)](#get-one-user-admin)
    - [GET ONE USER (me)](#get-one-user-me)
    - [UPDATE USER DETAILS (me)](#update-user-details-me)
    - [DEACTIVATE USER ACCOUNT (me)](#deactivate-user-account-me)
  - [AUTH ROUTE](#auth-route)
    - [LOGIN OR REGISTER USER (me)](#login-or-register-user-me)
    - [GET USER OR SELF (admin)](#get-user-or-self-admin)
    - [UPDATE USER ADMIN STATUS BY ID (admin)](#update-user-admin-status-by-id-admin)
    - [DEACTIVATE USER (admin)](#deactivate-user-admin)
    - [UPDATE USER CREDENTIALS (me)](#update-user-credentials-me)
    - [GET ALL SUBS BY USER (admin)](#get-all-subs-by-user-admin)
    - [UPDATE SUB (admin)](#update-sub-admin)
    - [GET ALL PENDING SUBS (admin)](#get-all-pending-subs-admin)

List of Routes and SubRoutes with verbs:

- /client
  - / (GET, POST)
  - /:clientId (GET, PUT, DELETE)
- /favorite
  - /fav (GET, POST)
  - /fav:favId (PUT, DELETE)
  - /color (GET)
  - /color/id/:colorId (GET)
  - /color/n/:name (GET)
  - /color/c/:code (GET)
  - /item (GET)
  - /item/id/:itemId (GET)
  - /item/n/:name (GET)
  - /item/t/:type (GET)
  - /item/s/:subtype (GET)
  - /pattern (GET)
  - /pattern/id/:patternId (GET)
  - /pattern/n/:name (GET)
- /user
  - /admin (GET)
  - /admin/:userId (PUT)
  - /me (GET)
  - /update/:userId (PUT)
  - /delete/:userId (DELETE)
- /auth
  - / (POST)
  - /admin/:userID (GET, PATCH, DELETE)
  - /credentials/:userId (PATCH)
  - /subs/:subId (PATCH)
  - /subs/user/:subId (GET)
  - /pending-subs (GET)
- / (GET)(Welcome Message)

## CLIENT ROUTE

### GET ALL CLIENTS BY USER ID

> Request:

```js
fetch(`${url}?u=${userId}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
})
```

> <br/>
> Response:

```js
[
  { id, name, email, phone, userId, status: "inactive" },
  { ...Client }
]
```

### CREATE CLIENT

> Request:

```js
fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  }
  body: {
  clientData: {
    name: "",
    email: "",
    phone: "",
    userId: "uuid"
  }
  }
})
```

> <br/>
> Response:

```js
{
  id: "uuid",
  name: "",
  email: "",
  phone: "",
  userId: "uuid",
  status: "active"
}
```

### GET ONE CLIENT

> Request:

```js
fetch(`${url}/${clientId}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
})
```

> <br/>
> Response:

```js
{
  id: "uuid",
  name: "",
  email: "",
  phone: "",
  userId: "uuid",
  status: "active"
}
```

### GET INACTIVE CLIENTS

> Request:

```js
fetch(`${url}?u=${userId}&i=true`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
})
```

> <br/>
> Response:

```js
[
  { id, name, email, phone, userId, status: "inactive" },
  { ...Client }
]
```

### UPDATE OR REACTIVATE CLIENT

> Request:

```js
fetch(`${url}/${clientId}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: {
    clientData: { ...clientData }
  }
})
// reactivate
fetch(`${url}/${clientId}?r=true`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
})
```

> <br/>
> Response:

### DELETE CLIENT (deactivate)

> Request:

```js
fetch(`${url}/${clientId}`, {
  method: "DELETE",
  headers: { "Content-Type": "application/json" }
})
```

> <br/>
> Response:

## FAVORITE ROUTE

### GET ALL FAVORITES

> Request:



> <br/>
> Response:

### GET FAVORITE BY ID

> Request:



> <br/>
> Response:

### GET ALL COLORS

> Request:



> <br/>
> Response:

### GET COLOR BY ID

> Request:



> <br/>
> Response:

### GET COLOR BY NAME

> Request:



> <br/>
> Response:

### GET COLOR BY CODE

> Request:



> <br/>
> Response:

### GET ALL ITEMS

> Request:



> <br/>
> Response:

### GET ITEM BY ID

> Request:



> <br/>
> Response:

### GET ITEM BY NAME

> Request:



> <br/>
> Response:

### GET ITEM BY TYPE

> Request:



> <br/>
> Response:

### GET ITEM BY SUBTYPE

> Request:



> <br/>
> Response:

### GET ALL PATTERNS

> Request:



> <br/>
> Response:

### GET PATTERN BY ID

> Request:



> <br/>
> Response:

### GET PATTERN BY NAME

> Request:



> <br/>
> Response:

## USER ROUTE

### GET ALL USERS (admin)

> Request:



> <br/>
> Response:

### GET ONE USER (admin)

> Request:



> <br/>
> Response:

### GET ONE USER (me)

> Request:



> <br/>
> Response:

### UPDATE USER DETAILS (me)

> Request:



> <br/>
> Response:

### DEACTIVATE USER ACCOUNT (me)

> Request:



> <br/>
> Response:

## AUTH ROUTE

### LOGIN OR REGISTER USER (me)

> Request:



> <br/>
> Response:

### GET USER OR SELF (admin)

> Request:



> <br/>
> Response:

### UPDATE USER ADMIN STATUS BY ID (admin)

> Request:



> <br/>
> Response:

### DEACTIVATE USER (admin)

> Request:



> <br/>
> Response:

### UPDATE USER CREDENTIALS (me)

> Request:



> <br/>
> Response:

### GET ALL SUBS BY USER (admin)

> Request:



> <br/>
> Response:

### UPDATE SUB (admin)

> Request:



> <br/>
> Response:

### GET ALL PENDING SUBS (admin)

> Request:



> <br/>
> Response:

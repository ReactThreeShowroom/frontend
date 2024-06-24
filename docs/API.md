# API Docs

[Back to Main README](../README.md)

- [API Docs](#api-docs)
  - [CLIENT ROUTE](#client-route)
    - [Get All Clients:](#get-all-clients)
    - [Get One Client:](#get-one-client)
  - [FAVORITE ROUTE](#favorite-route)
    - [Get All Favorites:](#get-all-favorites)
    - [Get Favorite By ID:](#get-favorite-by-id)
    - [Get All Colors:](#get-all-colors)
    - [Get Color By ID:](#get-color-by-id)
    - [Get Color By Name:](#get-color-by-name)
    - [Get Color By Code:](#get-color-by-code)
    - [Get All Items:](#get-all-items)
    - [Get Item By ID:](#get-item-by-id)
    - [Get Item By Name:](#get-item-by-name)
    - [Get Item By Type:](#get-item-by-type)
    - [Get Item By SubType:](#get-item-by-subtype)
    - [Get All Patterns:](#get-all-patterns)
    - [Get Pattern By ID:](#get-pattern-by-id)
    - [Get Pattern By Name:](#get-pattern-by-name)
  - [USER ROUTE](#user-route)
    - [Get All Users (admin):](#get-all-users-admin)
    - [Get One User (admin):](#get-one-user-admin)
    - [Get One User (me):](#get-one-user-me)
    - [Update User Details (me):](#update-user-details-me)
    - [Deactivate User Account (me):](#deactivate-user-account-me)
  - [AUTH ROUTE](#auth-route)
    - [Login or Register User (me):](#login-or-register-user-me)
    - [Get User or Self (admin):](#get-user-or-self-admin)
    - [Update User Admin Status By Id (admin):](#update-user-admin-status-by-id-admin)
    - [Deactivate User (admin):](#deactivate-user-admin)
    - [Update User Credentials (me):](#update-user-credentials-me)
    - [Get All Subs By User (admin):](#get-all-subs-by-user-admin)
    - [Update Sub (admin):](#update-sub-admin)
    - [Get All Pending Subs (admin):](#get-all-pending-subs-admin)

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

### Get All Clients:

> Request:
> Response:

### Get One Client:

> Request:
> Response:

## FAVORITE ROUTE

### Get All Favorites:

> Request:
> Response:

### Get Favorite By ID:

> Request:
> Response:

### Get All Colors:

> Request:
> Response:

### Get Color By ID:

> Request:
> Response:

### Get Color By Name:

> Request:
> Response:

### Get Color By Code:

> Request:
> Response:

### Get All Items:

> Request:
> Response:

### Get Item By ID:

> Request:
> Response:

### Get Item By Name:

> Request:
> Response:

### Get Item By Type:

> Request:
> Response:

### Get Item By SubType:

> Request:
> Response:

### Get All Patterns:

> Request:
> Response:

### Get Pattern By ID:

> Request:
> Response:

### Get Pattern By Name:

> Request:
> Response:

## USER ROUTE

### Get All Users (admin):

> Request:
> Response:

### Get One User (admin):

> Request:
> Response:

### Get One User (me):

> Request:
> Response:

### Update User Details (me):

> Request:
> Response:

### Deactivate User Account (me):

> Request:
> Response:

## AUTH ROUTE

### Login or Register User (me):

> Request:
> Response:

### Get User or Self (admin):

> Request:
> Response:

### Update User Admin Status By Id (admin):

> Request:
> Response:

### Deactivate User (admin):

> Request:
> Response:

### Update User Credentials (me):

> Request:
> Response:

### Get All Subs By User (admin):

> Request:
> Response:

### Update Sub (admin):

> Request:
> Response:

### Get All Pending Subs (admin):

> Request:
> Response:

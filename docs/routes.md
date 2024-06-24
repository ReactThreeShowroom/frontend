# Routes

[Back to Main README](../README.md)

```text
pages
  ├── Account.jsx
  ├── Admin.jsx
  ├── Home.jsx
  ├── PasswordReset.jsx
  ├── Showroom.jsx
  ├── SignIn.jsx
  └── SignUp.jsx
```

All of these files pipe through an `index.js` as imports and exports for ease of use:

```js
// in routes.jsx, used in main.jsx
import { Account } from '../pages'
```

## The Router Object

The routes object created in `routes.jsx`:

```jsx
const rootChildren = [
  { index: true, element: <Home /> },
  { path: '/account', element: <Account /> },
  { path: '/admin', element: <Admin /> },
  { path: '/passwordReset', element: <PasswordReset /> },
  { path: '/showroom', element: <Showroom /> },
  { path: '/signin', element: <SignIn /> },
  { path: '/signup', element: <SignUp /> }
]

const routes = [{ path: '/', element: <App />, children: rootChildren }]
```

This routes object is used in the `createBrowserRouter` function imported from `react-router-dom`.

The browser router instantiated here is used in the `RouterProvider` also imported from `react-router-dom`.

This pattern now gives the app access to an internal context for free, through the `Outlet` component. The `Outlet` replaces an older pattern:

```jsx
<Switch>
  <Route path="/" element={<Home />}/>
  <Route path="/account" element={<Account />}/>
  <Route path="/admin" element={<Admin />}/>
</Switch>
//or
<Routes>
  <Route path="/" element={<Home />}/>
  <Route path="/account" element={<Account />}/>
  <Route path="/admin" element={<Admin />}/>
</Routes>
```

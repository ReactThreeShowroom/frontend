# Utils

Utility files are generally going to be in the `utils` folder under `src`.

## Contents

This folder holds:

- event handlers
- hooks
- fetches
- helpers
- map callbacks
- routes

## Handlers

The general events so far are form submits and changes. Likely more to come.

## Hooks

Hooks include a navigate-on-click that may or may not be working. Doesn't seem to be any benefit to abstracting this over just importing `useNavigate` in the component.

## Fetches

fetches are currently empty, and needs to be populated.

## Helpers

There's also a `linkProps` file that helps to format properties for link components and a `locationHelpers` file that helps to format the `location` object from `react-router-dom`.

The location object gets destructured into the path name, search queries, and hash info. This can be passed into the `Outlet` context and the `navState` object or used in a component directly. Currently it's being used in the `main.jsx` and then passed to `NavBar`.

## Map Callbacks

Callbacks for Maps can go [here](../src/utils/maps.jsx) if abstractions are neccessary.

## Routes

See [routes.md](./routes.md) and [routes.jsx](../src/utils/routes.jsx)

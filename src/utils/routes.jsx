import App from "../App";
import {
  Admin,
  Home,
  Account,
  SignIn,
  SignUp,
  Showroom,
  PasswordReset,
} from "../components";

const rootChildren = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/showroom",
    element: <Showroom />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/passwordReset",
    element: <PasswordReset />,
  },
];

const routes = [
  {
    path: "/",
    element: <App />,
    children: rootChildren,
  },
];

export default routes;

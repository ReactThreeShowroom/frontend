import App from '../App'
import {
  Account,
  Admin,
  Home,
  PasswordReset,
  Showroom,
  SignIn,
  SignUp,
  SingleClient
} from '../pages'
import { fetchClientLoader, fetchUserLoader, updateClientAction } from './fetches'

const rootChildren = [
  { index: true, element: <Home /> },
  { path: '/account', element: <Account /> },
  {
    path: '/client/:clientId',
    element: <SingleClient />,
    loader: fetchClientLoader,
    action: updateClientAction
  },
  { path: '/admin', element: <Admin /> },
  { path: '/passwordReset', element: <PasswordReset /> },
  { path: '/showroom', element: <Showroom /> },
  { path: '/signin', element: <SignIn /> },
  { path: '/signup', element: <SignUp /> }
]

const routes = [{ path: '/', element: <App />, loader: fetchUserLoader, children: rootChildren }]

export default routes

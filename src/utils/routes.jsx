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
import { fetchUserLoader } from './fetches'

const rootChildren = [
  { index: true, element: <Home /> },
  { path: '/account', element: <Account /> },
  { path: '/client/:clientId', element: <SingleClient /> },
  { path: '/admin', element: <Admin /> },
  { path: '/passwordReset', element: <PasswordReset /> },
  { path: '/showroom', element: <Showroom /> },
  { path: '/signin', element: <SignIn /> },
  { path: '/signup', element: <SignUp /> }
]

const routes = [{ path: '/', element: <App />, loader: fetchUserLoader, children: rootChildren }]

export default routes

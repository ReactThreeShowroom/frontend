import App from '../App'
import { Admin, Home, Account, SignIn, SignUp, Showroom } from '../components'

export const links = [
  { value: 'Home', path: '/' },
  { value: 'Showroom', path: '/showroom' },
  { value: 'Admin', path: '/admin' },
  { value: 'Account', path: '/account' },
  { value: 'Sign Up', path: '/signup' },
  { value: 'Sign In', path: '/signin' }
]

const rootChildren = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/admin',
    element: <Admin />
  },
  {
    path: '/account',
    element: <Account />
  },
  {
    path: '/signin',
    element: <SignIn />
  },
  {
    path: '/showroom',
    element: <Showroom />
  },
  {
    path: '/signup',
    element: <SignUp />
  }
]

const routes = [
  {
    path: '/',
    element: <App />,
    children: rootChildren
  }
]

export default routes

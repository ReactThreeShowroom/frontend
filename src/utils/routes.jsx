import App from '../App'
import { Admin, Home, Account, SignIn, SignUp } from '../components'

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

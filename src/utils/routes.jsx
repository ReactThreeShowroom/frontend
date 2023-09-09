import App from '../App'
import { Admin, Home, Settings } from '../components'

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
    path: '/settings',
    element: <Settings />
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

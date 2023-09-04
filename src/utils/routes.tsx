import App from '../App'
import {Admin, Home, Settings } from '../components'
import { RouteObject } from 'react-router'

const rootChildren: RouteObject[] = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/admin',
    element: <Admin />
  },
  {
    path: '/Settings',
    element: <Settings />
  }
]

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: rootChildren
  }
]

export default routes

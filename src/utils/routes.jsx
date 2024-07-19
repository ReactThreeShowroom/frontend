import App from '../App'
import ShowroomCanvas from '../components/ShowroomCanvas'
import SingleSubAdmin from '../components/SingleSubAdmin'
import SingleUserAdmin from '../components/SingleUserAdmin'
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
import {
  fetchClientLoader,
  fetchPendingSubs,
  fetchUserForAdminLoader,
  fetchUserLoader,
  getOneUserAdmin,
  updateClientAction,
  updateSubAction
} from './fetches'

const rootChildren = [
  { index: true, element: <Home /> },
  { path: '/account', element: <Account /> },
  {
    path: '/client/:clientId',
    element: <SingleClient />,
    loader: fetchClientLoader,
    action: updateClientAction
  },
  {
    path: '/admin',
    element: <Admin />,
    loader: async () => {
      const token = localStorage.getItem('token')
      const pendingSubs = await fetchPendingSubs(token)
      return { pendingSubs }
    },
    children: [
      {
        path: 'sub/:subId',
        element: <SingleSubAdmin />,
        loader: async ({ params }) => {
          const { subId } = params
          const token = localStorage.getItem('token')
          const subs = await fetchPendingSubs(token)
          return subs.filter((sub) => sub.id === subId)[0] || { user: {} }
        },
        action: async ({ request }) => {
          let formData = await request.formData()
          let intent = formData.get('intent')
          let area = intent.slice(intent.length - 3)
          if (area === 'Sub') {
            let subId = formData.get('subId')
            let type = formData.get('type')
            intent = intent.slice(0, intent.length - 3)
            const res = await updateSubAction(subId, intent, type)
            return res
          }
        }
      },
      {
        path: 'user/:userId',
        element: <SingleUserAdmin />,
        loader: ({ request, params }) => {
          const token = localStorage.getItem('token')
          const { userId } = params
          return getOneUserAdmin({ userId, token })
        },
        action: async ({ request }) => {
          let formData = await request.formData()
          let intent = formData.get('intent')
          let subId = formData.get('subId')
          let type = formData.get('type')
          const res = await updateSubAction(subId, intent, type)
          return res
        }
      }
    ]
  },
  { path: '/passwordReset', element: <PasswordReset /> },
  {
    path: '/showroom',
    element: <Showroom />,
    children: [{ path: 'item/:itemId', element: <ShowroomCanvas /> }]
  },
  { path: '/signin', element: <SignIn /> },
  { path: '/signup', element: <SignUp /> }
]

const routes = [{ path: '/', element: <App />, loader: fetchUserLoader, children: rootChildren }]

export default routes

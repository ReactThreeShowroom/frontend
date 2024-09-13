import { redirect } from 'react-router'
import App from '../App'
import ApplicatorShowroom from '../components/ApplicatorShowroom'
import ShowroomCanvas from '../components/ShowroomCanvas'
import SingleSubAdmin from '../components/SingleSubAdmin'
import SingleUserAdmin from '../components/SingleUserAdmin'
import ClientShowroom from '../components/ClientShowroom'
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
  fetchColorLoader,
  fetchFavoriteLoader,
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
    path: '/c/:clientId',
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
    children: [
      {
        path: 'c/:clientId',
        element: <ApplicatorShowroom />,
        loader: async ({ request, params }) => {
          const { clientId } = params
          const response = {}
          response.user = await (await fetchUserLoader()).json()
          response.colors = await fetchColorLoader()
          response.client = await (await fetchClientLoader({ params })).json()
          console.log('In loader, response', response.user, response.client)
          if (!response.user.id || !response.client.id) return redirect('/')
          return response
        },
        children: [{ path: 'm/:modelId', element: <ShowroomCanvas /> }]
      },
      {
        path: 'f/:favId',
        element: <ClientShowroom />,
        loader: async ({ request, params }) => {
          const { favId } = params
          const clientLoaderObj = { params: { clientId: response.favorite.clientId } }
          const response = {}
          response.colors = await fetchColorLoader()
          response.favorite = await fetchFavoriteLoader(favId)
          response.client = await (await fetchClientLoader(clientLoaderObj)).json()
          return response
        }
      }
    ]
  },
  { path: '/signin', element: <SignIn /> },
  { path: '/signup', element: <SignUp /> }
]

const routes = [{ path: '/', element: <App />, loader: fetchUserLoader, children: rootChildren }]

export default routes

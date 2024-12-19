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
  fetchModelsLoader,
  fetchPendingSubs,
  fetchUserForAdminLoader,
  fetchUserLoader,
  getOneUserAdmin,
  updateClientAction,
  updateFavoriteAction,
  updateSubAction
} from './fetches'
import RequestNewSubForm from '../components/RequestNewSubForm'

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
          response.models = await fetchModelsLoader()
          if (!response.user.id || !response.client.id) return redirect('/')
          return response
        },
        action: async ({ request, params }) => {
          const formData = await request.formData()
          const name = formData.get('favName')
          const id = formData.get('favId')
          const modelPath = formData.get('modelPath')

          // update favorite using favName in the favoriteData
          // fetchBody: JSON.stringify({ favoriteId: id, favoriteData: { name } })
          const newFav = await updateFavoriteAction(id, { name })
          console.log('newFav in action', newFav)
          return redirect(`/showroom/c/${params.clientId}/m/${modelPath}?f=${id}`)
        },
        children: [
          {
            path: 'm/:modelPath',
            element: <ShowroomCanvas />,
            loader: async ({ request, params }) => {
              if (!params.modelPath) return redirect('/')
              return null
            },
            action: async ({ request, params }) => {
              const _formData = await request.formData()
              let formData = {}
              let pieces = []
              for (const pair of _formData.entries()) {
                pair[0].startsWith('data-')
                  ? pieces.push(JSON.parse(pair[1]))
                  : (formData[pair[0]] = pair[1])
              }
              const currentFavorite = await fetchFavoriteLoader(formData.favId)
              const favoriteData = structuredClone(currentFavorite)
              if (currentFavorite.notes !== formData.notes) favoriteData.notes = formData.notes
              if (currentFavorite.modelId !== formData.modelId) {
                favoriteData.modelId = formData.modelId
              }
              favoriteData.pieceFavorite = [...pieces]
              await updateFavoriteAction(formData.favId, favoriteData)
              const newFav = await fetchFavoriteLoader(formData.favId)
              const response = { newFav }
              return response
            }
          }
        ]
      },
      {
        path: 'f/:favId',
        element: <ClientShowroom />,
        loader: async ({ request, params }) => {
          const { favId } = params
          const response = {}
          response.colors = await fetchColorLoader()
          response.favorite = await fetchFavoriteLoader(favId)
          if (!response.favorite.id) return redirect('/')
          const clientLoaderObj = { params: { clientId: response.favorite.clientId } }
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

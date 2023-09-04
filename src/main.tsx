import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import {store} from './utils/store'
import {routes} from './utils/routes'
import './index.css'

const root = createRoot(document.getElementById('root')!)

const router = createBrowserRouter(routes)

root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
)

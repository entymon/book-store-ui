import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import DetailsPage from './pages/DetailsPage'
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import Layout from './components/Layout'

const router = createBrowserRouter([
  { path: '/', element: <Layout><HomePage/></Layout>},
  { path: '/create', element: <Layout><DetailsPage /></Layout>},
  { path: '/details', element: <Layout><CreatePage /></Layout>}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import DetailsPage from './pages/DetailsPage'
import HomePage from './pages/HomePage'
import Layout from './components/Layout'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const router = createBrowserRouter([
  { path: '/', element: <Layout><HomePage/></Layout>},
  { path: '/details/:id', element: <Layout><DetailsPage /></Layout>}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
      <RouterProvider router={router} />
    </LocalizationProvider>
  </StrictMode>,
)

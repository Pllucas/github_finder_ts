import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

//ROUTES
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//PAGES
import Home from './routes/Home.tsx'
import Repos from './routes/Repos.tsx'

const router = createBrowserRouter([
    {
      path:"/",
      element: <App/>,
      children:[
        {
          path:'/',
          element: <Home/>,
        },
        {
          path:'/repos/:username',
          element: <Repos/>,
        }
      ]
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

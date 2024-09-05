import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RoomPage from './pages/Room/index.jsx';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' >
    <Route path='' element={<App />} />
    <Route path=':roomID/whiteboard' element={<RoomPage />} />
  </Route>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>,
)

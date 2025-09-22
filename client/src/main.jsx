import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import Movies from './pages/Movies.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import SeatLayout from './pages/SeatLayout.jsx'
import MyBookings from './pages/MyBookings.jsx'
import Favourite from './pages/Favourite.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import AddShows from './pages/admin/AddShows.jsx'
import ListShows from './pages/admin/ListShows.jsx'
import ListBookings from './pages/admin/ListBookings.jsx'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='/movies' element={<Movies />} />
      <Route path='/movies/:id' element={<MovieDetails />} />
      <Route path='/movies/:id/:date' element={<SeatLayout />} />
      <Route path='/my-bookings' element={<MyBookings />} />
      
    </Route>

    <Route path='/admin' element={<AdminLayout />} >
      <Route path='' element={<Dashboard />}  />
      <Route path='add-shows' element={<AddShows />} />
      <Route path='list-shows' element={<ListShows />} />
      <Route path='list-bookings' element={<ListBookings />} />
    </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router} />
  </ClerkProvider>
  
  
)

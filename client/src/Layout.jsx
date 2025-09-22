import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const Layout = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin')

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Outlet />
      {!isAdminRoute && <Footer />}
    </>
  )
}

export default Layout

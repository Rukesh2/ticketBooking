import React from 'react'
import Navbar from '../../components/admin/Navbar'
import Sidebar from '../../components/admin/Sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const AdminLayout = () => {
  
  return (
    <>
      <Navbar /> 
      <div className='flex '>
        <Sidebar/>
        <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AdminLayout
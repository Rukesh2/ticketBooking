import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import {SearchIcon,MenuIcon, XIcon, TicketPlus} from 'lucide-react'
import {useClerk, UserButton, useUser} from '@clerk/clerk-react'

const Navbar = () => {

  const[isOpen,setIsOpen] = useState(false)

  const {user} = useUser()
  const {openSignIn} = useClerk()

  const navigate = useNavigate()

  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5'>

      {/* leftmost: logo of the page   */}
      <Link className='max-md:flex-1' to='/'>
      <img src={assets.logo} alt="" className='w-36 h-auto' />
      </Link>

      {/* middle one: the contents of the navbar */}
      <div className={`flex items-center z-50 px-8 py-4 gap-6 border border-white/10 rounded-full bg-white/10 backdrop-blur
                       max-md:absolute max-md:left-0 max-md:top-0 max-md:flex-col max-md:items-center max-md:gap-8 max-md:h-screen  max-md:rounded-none max-md:justify-center max-md:bg-black/10 max-md:text-xl ${isOpen ? 'max-md:w-full' : 'max-md:hidden' } `}>
        
        <XIcon onClick={() => setIsOpen(!isOpen)} className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' />

        <Link onClick={()=>{scrollTo(0,0); setIsOpen(false)}} to='/'>Home</Link>
        <Link onClick={()=>{scrollTo(0,0); setIsOpen(false)}} to='/movies'>Movies</Link>
        <Link onClick={()=>{scrollTo(0,0); setIsOpen(false)}} to='/'>Theaters</Link>
        <Link onClick={()=>{scrollTo(0,0); setIsOpen(false)}} to='/'>Releases</Link>
        

      </div>

      {/* the last which contains the search and the login button  */}
      <div className='flex items-center gap-6'>

        {/* if there is no user we will display the login button and when he clicks that we will use clerk provided openSignIn method */}
        <SearchIcon className='max-md:hidden w-6 h-6 cursor-pointer' />
        {
          user ?  (
          <UserButton>

            <UserButton.MenuItems>
              <UserButton.Action
              label="My Bookings"
              labelIcon={<TicketPlus width={15} />}
              onClick={() => navigate('/my-bookings')}
            />
            </UserButton.MenuItems>
          
          </UserButton>
        ):(
        <button onClick={openSignIn} className='px-4 py-1 sm:px-7 sm:py-2 transition rounded-full font-medium cursor-pointer bg-[#F84565] hover:bg-[#e6163c]'>
          Login
        </button>)
        
        }
      </div>

      {/* for mobile icons */}
      <MenuIcon onClick={() => setIsOpen(!isOpen)} className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer' />

    </div>
  )
}

export default Navbar
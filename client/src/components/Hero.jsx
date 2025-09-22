import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {

  const navigate = useNavigate()
  return (
    /* the background image is in the div of this 👇 */
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>
      
      <img src={assets.marvelLogo} className='max-h-11 lg:h-11 mt-20' alt="" />
      <h1 className='text-5xl md:text-[70px] md:leading-18 font-bold'>Guardians <br /> of the Galaxy</h1>

      {/* the content of the movie */}

      <div className='flex items-center gap-4 text-gray-500'>
        <span>Action | Adventure | Sci-Fi</span>
        <div className='flex items-center gap-2'>
          <CalendarIcon className='w-4.5 h-4.5' /> 2018
        </div>
        <div className='flex items-center gap-2'>
          <ClockIcon className='w-4.5 h-4.5' /> 2h 8m
        </div>
      </div>

      {/* movie description */}
      <p className='max-w-md text-lg'>
        In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and  try to stop a conspiracy.
      </p>

      {/* explore button */}
      <button onClick={() => navigate('/movies')}  className=' flex items-center gap-1 cursor-pointer border-none rounded-full bg-[#F84565] hover:bg-[#e6163c] px-6 py-2'>
        Explore Movies <ArrowRight className='h-4.5 w-4.5' />
      </button>

    </div>
  )
}

export default Hero
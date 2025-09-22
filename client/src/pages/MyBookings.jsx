import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets.js'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import { timeFormat } from '../lib/timeFormat'
import { dateFormat, isoTimeFormat } from '../lib/IsoTimeFormat'

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY

  const[bookings,setBookings] = useState([])
  const[isLoading,setIsLoading] = useState(true)

  const getMyBookings = async()=>{
    setBookings(dummyBookingData)
    setIsLoading(false)
  }
  useEffect(()=>{
    getMyBookings()
  },[])
  
  console.log(bookings);
  

  return (
    <div className='relative px-6 md:px-16 lg:px-40 md:pt-40 min-h-[80vh]'>
     <BlurCircle top='100px' left='100px' />
     <div>
       <BlurCircle bottom='0px' left='600px' />
     </div>
     <h1 className='font-semibold text-lg mb-4'>My Bookings</h1>
     {
      bookings.map((item,index) =>(
        <div className='flex flex-col md:flex-row justify-between bg-[#F84565]/10 border border-[#F84565]/20 rounded-lg mt-4 p-2 max-w-3xl ' key={index}>
          <div className='flex flex-col md:flex-row items-center'>

          <img src={item.show.movie.poster_path} className='md:max-w-44 aspect-video h-fit object-cover object-bottom rounded ' alt="" />

          <div className='flex flex-col p-4'>
            <p className='text-lg font-semibold'>{item.show.movie.title}</p>
            <p className='text-sm text-gray-500'>{timeFormat(item.show.movie.runtime)}</p>
            <p className='text-gray-500 text-sm mt-auto'>{dateFormat(item.show.showDateTime)}</p>
          </div>

          </div>
          {/* price,totaltickets, seatNumber */}
          <div className='flex flex-col items-end justify-center'>
            <p>{currency} {item.amount}</p>
            {!item.isPaid ? <button className='bg-[#F84565] px-4 py-2 text-white font-semibold text-lg rounded-md my-auto hover:translate-y-2'>PayNow</button> : ''}
            <p className='text-gray-400 text-sm mt-2 mb-2'>TotalTickets:<span className='text-white text-sm'>{item.bookedSeats.length}</span></p>
            <p className='text-gray-400 text-sm'>SeatNumber:<span className='text-white text-sm'>{item.bookedSeats.join(",")}</span></p>
          </div>
          
        </div>
      ))
     }
    </div>
  )
}

export default MyBookings
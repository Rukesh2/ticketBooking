  import React, { useEffect, useState } from 'react'
  import { useNavigate, useParams } from 'react-router-dom'
  import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets'
  import { AlignRightIcon, ArrowRight, Clock3Icon } from 'lucide-react'
  import { isoTimeFormat } from '../lib/IsoTimeFormat.js'
  import Loading from '../components/Loading'
  import BlurCircle from '../components/BlurCircle'
  import toast from 'react-hot-toast'

  const SeatLayout = () => {

    const {id,date} = useParams()
    const[show,setShow] = useState(null)

    const[selectedSeats,setSelectedSeats] = useState([])
    const[selectedTiming,setSelectedTiming] = useState('')

    const findShow = async(id)=>{
      const show = dummyShowsData.find((item) => item._id == id)
      if(show){
        setShow({
          show:show,
          dateTime:dummyDateTimeData
        })
      }
    }

    useEffect(()=>{
      findShow(id)
      setSelectedSeats([])
    },[selectedTiming])
    
    const renderSeats = (row,count=9)=>(
      <div key={row} className='flex gap-2 mt-2'> 
        <div className='flex flex-wrap items-center justify-center gap-2'>
          {
            Array.from({length:count},(_,i)=>{
              const seatId = `${row}${i+1}`
              return (
              <button key={seatId} onClick={() => handleBooking(seatId)} className={`h-10 w-10 rounded-lg border border-[#F84565]/60 cursor-pointer ${selectedSeats.includes(seatId) ? 'bg-[#d93c59] text-white' : ''}`}>
                {seatId}
              </button>)
            })
          }
        </div>
      </div>
    )

    const rows = [["A","B"],["C","D"],["E","F"],["G","H"],["I","J"]];
    
    const handleBooking = (seatId)=>{
      if(!selectedTiming){
        return toast('please select timings for the movie')
      }
      if(!selectedSeats.includes(seatId) && selectedSeats.length > 4){
        return toast(`you can't book more than 5 tickets`)
      }
      setSelectedSeats((prev) => prev.includes(seatId) ? prev.filter((seat) => seat !== seatId) : [...prev,seatId])
    }

    const navigate = useNavigate()
    

    return show ? (
      <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-32 md:pt-52 overflow-hidden gap-4'>

        {/* Available Timings goes here */}
        <div className='flex flex-col gap-4 sticky md:px-8 md:py-4 px-4 py-2 bg-[#F84565]/20 w-72 h-fit rounded-lg '>
          <p className='text-lg font-semibold'>Available Timings</p>
          {
            show.dateTime[date].map((item) =>(
              <div onClick={() => setSelectedTiming(item)} key={item.time} className={`flex items-center gap-2  px-2 py-2 cursor-pointer ${selectedTiming.time === item.time ? 'bg-[#F84565]' : 'hover:bg-[#F84565]/30'}`}>
                <Clock3Icon />
                <p>{isoTimeFormat(item.time)}</p>
              </div>
            ))
          }
        </div>

        {/* Seat selection */}
        <div className='relative flex-1 flex flex-col items-center max-md:mt-16 gap-2  overflow-hidden'>
          <BlurCircle top='-110px' left='-100px' />
          <BlurCircle bottom='0' right='0'  />
          <h2 className='text-2xl font-semibold'>Select Your Seat</h2>
          <img src={assets.screenImage} alt="" />
          <p className='text-lg text-gray-400'>Screen Side</p>
          
          {/* seats display */}
          <div className='flex flex-col items-center mt-10 text-xs text-gray-300 '>
            <div className='grid md:grid-cols-1 grid-cols-2 gap-8 md:gap-2 mb-6 px-4 py-2'>
              { rows[0].map((row) => renderSeats(row)) }
            </div>
            <div className='grid grid-cols-2 gap-11'>
            {rows.slice(1).map((group,index)=> (
              <div key={index}>
                {group.map((row) => renderSeats(row))}
              </div>
            ))}
          </div>
          </div>
          <div className='flex items-center justify-center bg-[#F84565] hover:translate-y-1 mt-8 rounded-lg px-4 py-2 w-60 gap-2 mb-4'>
            <button onClick={() => {
              if(selectedSeats.length > 0){
                navigate('/my-bookings')
              }
              else{
                return toast(`Atleast one seat should be selected to make a ticket booking`)
              }
            }}>
              Proceed To CheckOut
            </button>
            <ArrowRight />
          </div>

        </div>


      </div>

      
    ) : <Loading />
  }

  export default SeatLayout
import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const DateSelect = ({dateTime,id}) => {


  const[selected,setSelected] = useState(null)
  const navigate = useNavigate()

  const onBookHandler = ()=>{
    if(!selected){
      return toast('please select a date')
    }
    navigate(`/movies/${id}/${selected}`)
    scrollTo(0,0)
  }


  return (
    <div id='dateSelect' className='pt-30 mt-16   '>
      <div className='flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-[#F84565]/20 border-[#e6163c] rounded-lg'>
        <BlurCircle top='-100px' left='-100px' />
        <BlurCircle top='100px' right='0px' />

        {/* the inner dev that contains the dates to choose for ticket booking  */}
        <div>
          <p>Choose Date</p>
          <div className='flex items-center gap-6 text-sm mt-5'>
            <ChevronLeftIcon width={28} />
            <span className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>
              {Object.keys(dateTime).map((date) =>(
                <button onClick={() => setSelected(selected == date ? null : date)} key={date} className={`flex flex-col items-center justify-center h-14 w-14  aspect-square rounded cursor-pointer hover:translate-y-1 transition-all ${selected === date ? 'bg-[#F84565] text-white' : 'border border-[#e6163c]'}`}>
                  <span>{new Date(date).getDate()}</span>
                  <span>{new Date(date).toLocaleDateString("en-us",{month:"short"})}</span>
                </button>
              ))}
            </span>
            <ChevronRightIcon width={28} />

          </div>
        </div>
        
        <button onClick={()=> onBookHandler()} className='bg-pink-700 hover:bg-pink-600 hover:translate-x-1 px-8 py-2 rounded-full cursor-pointer mt-6'>Book Now</button>
      </div>
    </div>
  )
}

export default DateSelect
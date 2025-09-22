import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import { dummyShowsData } from '../assets/assets'
import MovieCard from './MovieCard'

const FeaturedSection = ({title="Now Showing"}) => {
  const navigate = useNavigate()
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden '>
      
      {/* top one  */}
      <div className='relative flex items-center justify-between pt-20 pb-10'>

        <BlurCircle top='0' right='-80px'  />
        <p className='text-xl font-bold text-gray-300 cursor-pointer'>{title}</p>
        <button onClick={() => navigate('/movies')} className='flex items-center gap-2 text-gray-300 text-lg group-hover:translate-x-2'>View All <ArrowRight className=' transition h-4 w-4 hover:h-6 hover:w-6 ' /></button>
      </div>

      {/* middle one where we will mount the cards of the different movies */}
      <div className='flex max-sm:flex-col max-sm:justify-center gap-8 mt-8'>
        {
          dummyShowsData.slice(0,4).map((movie) => (
            <MovieCard  key={movie._id} movie={movie} />
          ))
        }
      </div>

      <div className='flex justify-center mt-20'>
        <button onClick={() =>{ navigate('/movies'); scrollTo(0,0)}} className='border-none rounded-md px-8 py-4 bg-[#F84565] hover:bg-[#e6163c] cursor-pointer'>Show more</button>
      </div>

    </div>
  )
}

export default FeaturedSection
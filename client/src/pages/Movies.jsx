import React from 'react'
import MovieCard from '../components/MovieCard'
import { dummyShowsData } from '../assets/assets'
import BlurCircle from '../components/BlurCircle'

const Movies = () => {
  return dummyShowsData.length > 0 ?(
      <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
        <BlurCircle top='150px' left='10px' />
        <h1 className='text-lg font-medium my-4'>Now Showing</h1>
        <div className='flex flex-wrap max-sm:justify-center gap-8'>
          {
            dummyShowsData.map((movie) => (
              <MovieCard movie={movie} key={movie._id} />
            ))
          }
        </div>
        <BlurCircle right='0px' bottom='10px' />
      </div>

    
  ) : (
    <div className='flex items-center justify-center text-3xl border border-emerald-500 mt-60'>
      No shows available now
    </div>
  )
}

export default Movies
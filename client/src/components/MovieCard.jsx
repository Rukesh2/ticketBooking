import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { StarIcon } from 'lucide-react'
import { timeFormat } from '../lib/timeFormat'

const MovieCard = ({movie}) => {
  const navigate = useNavigate()
  
  
  return (
    <div className='flex-col  justify-between p-3 bg-black/50 rounded-2xl hover:translate-y-1 transition duration-300 w-66'>
      {/* image of the movie */}
      <img onClick={() => { navigate(`/movies/${movie._id}`); scrollTo(0,0) }} className='rounded-lg h-52 w-full object-cover cursor-pointer object-right-bottom' src={movie.backdrop_path} alt="" />

      {/* movie title */}
      <p className='font-bold mt-2 truncate'>{movie.title}</p>

      {/* movie description */}
      <p className='text-sm text-gray-400 mt-2'>
        {new Date(movie.release_date).getFullYear()} - {movie.genres.slice(0,2).map(genre => genre.name).join(" | ")} - {timeFormat(movie.runtime)}
      </p>

      {/* user section where he can buy a ticket and see the ratings */}
      <div className='flex items-center mt-4 pb-3 justify-between'>

        <button onClick={() => {navigate(`/movies/${movie._id}`); scrollTo(0,0)}} className='px-4 py-2 bg-[#F84565] hover:bg-[#e6163c] rounded-full cursor-pointer'>
          Buy Tickets
        </button>

        <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
          <StarIcon className='h-4 w-4 fill-[#F84565] ' />
          {movie.vote_average.toFixed(1)}
        </p>

      </div>

    </div>
  )
}

export default MovieCard
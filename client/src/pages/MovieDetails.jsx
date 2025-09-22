import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { dummyCastsData, dummyDateTimeData, dummyShowsData } from '../assets/assets'
import { HeartIcon, PlayCircleIcon, PlayIcon, StarIcon } from 'lucide-react'
import BlurCircle from '../components/BlurCircle'
import { timeFormat } from '../lib/timeFormat'
import DateSelect from '../components/DateSelect'
import FeaturedSection from '../components/FeaturedSection'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'

const MovieDetails = () => {

  const {id} = useParams()
  const[show,setShow] = useState(null)

  const getShow = async()=>{
    const show = dummyShowsData.find((show) => show._id === id)
    if(show){
    setShow({
      movie:show,
      dateTime:dummyDateTimeData
    })
  }
  }
  const navigate = useNavigate()

  useEffect(()=>{
    getShow()
  },[id])

  return show ? (
    <div className='px-6 md:px-16 lg:px-40 mt-40 md:pt-50'>

      {/* the div that has the movie details image and the details of the movie */}
      <div className='flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto '>

         {/* movie_poster goes here */}
          <img className='max-md:mx-auto h-104 max-w-60 rounded-xl object-cover' src={show.movie.poster_path} alt="" />
          
          {/* the details of the movie */}
          <div className='relative flex flex-col gap-3'>
            <BlurCircle top='-100px' left='-100px' />
            <h3>ENGLISH</h3>
            <p className='text-3xl font-semibold max-w-96 text-balance'>{show.movie.title}</p>
            
            <div className='flex items-center gap-2 text-gray-300'>
              <StarIcon className='h-6 w-5 border-none fill-[#F84565] ' />
              {show.movie.vote_average.toFixed(1)}
              <p>IMDB Rating</p>
            </div>

            <p>{show.movie.overview}</p>

            <p className='text-lg text-gray-400 mt-2'>
                    {new Date(show.movie.release_date).getFullYear()} - {show.movie.genres.slice(0,2).map(genre => genre.name).join(" | ")} - {timeFormat(show.movie.runtime)}
            </p>

            <div className='flex items-center gap-4 mt-4'>
              <button className='bg-gray-800 px-8 py-4 rounded-lg flex items-center gap-2 hover:bg-gray-600 hover:translate-y-1 transition-all'>
                <PlayCircleIcon /> <span>Watch Trailer</span> 
              </button>
             <a href="#dateSelect" className='bg-pink-700 px-8 py-4 rounded-lg hover:bg-pink-600 hover:translate-y-1'>Buy Tickets</a>
              <div className='px-2 py-2 bg-gray-700 rounded-full hover:bg-gray-600 hover:translate-y-1'>
                <HeartIcon className='rounded-full w-6 h-6 ' />
              </div>
              
            </div>
          </div>

      </div>
      
      {/* cast details and the images of the cast */}
      <h3 className='mt-10'>Your Favorite Cast</h3>
      <div className='overflow-x-auto no-scrollbar mt-8 pb-4'>
        <div className='flex items-center gap-4 w-max px-4'>
          {
            show.movie.casts.slice(0,10).map((cast,index) => (
              <div key={index} className='flex flex-col items-center text-center'>
                <img src={cast.profile_path} alt="" className='rounded-full h-20 md:h-20 aspect-square object-cover' />
                <p>{cast.name}</p>
              </div>
            ))
          }
        </div>
      </div>

      <DateSelect dateTime={show.dateTime} id={id} />

      <p className='text-lg font-medium mt-20 mb-8'>You May Also Like</p>
      <div className='sm:flex-row max-sm:justify-center flex  gap-8'>
        {
          dummyShowsData.slice(0,4).map((movie,index)=>(
            <MovieCard key={index} movie={movie} />
          ))
        }
      </div>
      
      <div className='flex justify-center mt-20'>
        <button onClick={() =>{ navigate('/movies'); scrollTo(0,0) }} className='bg-[#F84565] hover:translate-y-1 hover:bg-[#F84565]/60 rounded-lg px-6 py-2'>
          Show More
        </button>
      </div>
     
    </div>
  ) : <Loading />
}

export default MovieDetails
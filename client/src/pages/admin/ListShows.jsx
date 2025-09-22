import React, { useEffect, useState } from 'react'
import Title from '../../components/admin/Title'
import { dummyShowsData } from '../../assets/assets'
import Loading from '../../components/Loading'
import { dateFormat } from '../../lib/IsoTimeFormat'

const ListShows = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const[shows,setShows] = useState([])
  const[loading,setLoading] = useState(null)

  const getAllShows = async()=>{
    try {
      setShows([{
        movie: dummyShowsData[0],
        showDateTime: "2025-06-30T02:30:00.000Z",
        showPrice:59,
        occupiedSeats:{
          A1:"user_1",
          B1:"user_2",
          C1:"user_3"
        }
      }])
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(()=>{
    getAllShows();
  },[])
  return !loading ? (
    <>
      <Title text1="List" text2="Shows" />
      <div className='max-w-4xl mt-6 overflow-x-auto'>
        <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
          <thead>
            <tr className='bg-pink-600/20 text-left text-white'>
              <th className='p-2 font-medium pl-5' scope='col'>Movie Name</th>
              <th className='p-2 font-medium' scope='col'>Show Time</th>
              <th className='p-2 font-medium' scope='col'>Total Booking</th>
              <th className='p-2 font-medium' scope='col'>Earnings</th>
            </tr>
          </thead>
          <tbody className='text-sm font-light'>
            {
              shows.map((show,index)=>(
                <tr key={index} className='border-b border-pink-500/20 bg-pink-500/20 even:bg-pink-900'>
                  <td>{show.movie.title}</td>
                  <td>{dateFormat(show.showDateTime)}</td>
                  <td>{Object.keys(show.occupiedSeats).length}</td>
                  <td>{currency}{Object.keys(show.occupiedSeats).length*show.showPrice}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  ) : <Loading />
}

export default ListShows
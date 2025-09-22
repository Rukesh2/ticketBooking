import React, { useEffect, useState } from 'react'
import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UsersIcon } from 'lucide-react'
import { dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import BlurCircle from '../../components/BlurCircle';
import MovieCard from '../../components/MovieCard';
import { dateFormat } from '../../lib/IsoTimeFormat';

export default function Dashboard() {
  const currency = import.meta.env.VITE_CURRENCY || '₹'

  const [dashboard, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  })
  const [loading, setLoading] = useState(true)

  const fetchDashboardData = async () => {
    // replace with your real fetch call when ready
    setDashboardData(dummyDashboardData)
    setLoading(false)
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const dashboardCards = [
    { title: 'Total Bookings', value: dashboard.totalBookings ?? 0, icon: ChartLineIcon },
    { title: 'Total Revenue', value: dashboard.totalRevenue ?? 0, icon: CircleDollarSignIcon },
    { title: 'Active Shows', value: dashboard.activeShows?.length ?? 0, icon: PlayCircleIcon },
    { title: 'Total Users', value: dashboard.totalUser ?? 0, icon: UsersIcon },
  ]

  if (loading) return <Loading />

  return (
    <>
      <Title text1="Admin" text2="dashboard" />

      <div className="relative flex flex-wrap gap-4 mt-6">
        <BlurCircle top="-100px" left="0" />
        <div className="flex flex-wrap gap-4 w-full">
          {dashboardCards.map((card, index) => {
            // IMPORTANT: card.icon is a React component reference. To render it, assign to a
            // capitalized local variable and use as a JSX element.
            const Icon = card.icon
            const displayValue = card.title === 'Total Revenue' ? `${currency}${card.value}` : card.value

            return (
              <div
                key={index}
                className="flex items-center gap-2 justify-between px-4 py-2 bg-[#F84565]/10 border border-pink-600 rounded-sm w-full max-w-[13rem]"
              >
                <div>
                  <h1 className="text-sm">{card.title}</h1>
                  <p className="text-xl font-medium mt-1">{displayValue}</p>
                </div>

                <div>
                  <Icon className="h-8 w-8" />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <p className='mt-14 text-xl'>Active Movies</p>
      <div className='relative flex flex-wrap gap-6 mt-4 max-w-5xl'>
        <BlurCircle top='100px' left='-10%' />
        {
          dashboard.activeShows.map((show)=>(
            <div key={show._id} className='w-52 rounded-lg overflow-hidden h-full pb-3 bg-[#F84565]/20 hover:-translate-y-1 transition duration-300'>
              <img src={show.movie.poster_path} className='h-60 w-full object-cover' alt="" />
              <p className='font-medium p-2 truncate'>{show.movie.title}</p>
              <div className='flex items-center justify-between px-2'>
                <p className='text-lg font-medium'>{currency}{show.showPrice}</p>
                <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
                  <StarIcon className='w-4 h-4 text-[#F84565] fill-[#F84565]' />
                  {show.movie.vote_average.toFixed(1)}
                </p>
              </div>
              <div>
                <p className='px-2 pt-2 text-sm text-gray-500'>{dateFormat(show.showDateTime)}</p>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

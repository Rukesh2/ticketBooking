import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../../assets/assets'
import Loading from '../../components/Loading'
import Title from '../../components/admin/Title'
import { dateFormat } from '../../lib/IsoTimeFormat'
import BlurCircle from '../../components/BlurCircle'

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getAllBookings = async () => {
    setBookings(dummyBookingData)
    setIsLoading(false)
  }

  useEffect(() => {
    getAllBookings()
  }, [])

  return !isLoading ? (
    <>
      <Title text1="List" text2="Bookings" />
      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap shadow-lg">
          <thead>
            <tr className="bg-gray-800 text-gray-100 text-left">
              <th className="p-2 font-medium pl-5">User Name</th>
              <th className="p-2 font-medium">Movie Name</th>
              <th className="p-2 font-medium">Show Time</th>
              <th className="p-2 font-medium">Seats</th>
              <th className="p-2 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light text-gray-200">
            {bookings.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-700 odd:bg-gray-900 even:bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <td className="p-2 min-w-40 pl-5 font-medium">{item.user.name}</td>
                <td className="p-2">{item.show.movie.title}</td>
                <td className="p-2">{dateFormat(item.show.showDateTime)}</td>
                <td className="p-2">
                  {Array.isArray(item.bookedSeats)
                    ? item.bookedSeats.join(', ')
                    : Object.values(item.bookedSeats).join(', ')}
                </td>
                <td className="p-2 flex items-center gap-1 font-semibold text-blue-400">
                  {currency} {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  )
}

export default ListBookings

import React, { useEffect, useState } from "react";
import Title from "../../components/admin/Title";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loading";
import { CheckIcon, DeleteIcon, StarIcon } from "lucide-react";

const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState(""); // FIXED: string, not object
  const [showPrice, setShowPrice] = useState("");

  const fetchNowPlayingMovies = async () => {
    setNowPlayingMovies(dummyShowsData);
  };

  // ✅ Add Date-Time
  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });

    setDateTimeInput(""); // reset input
  };

  // ✅ Remove Date-Time
  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [date]: filteredTimes,
      };
    });
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  return nowPlayingMovies.length > 0 ? (
    <>
      <Title text1="Add" text2="Shows" />
      <h1 className="mt-8 text-2xl">NowPlaying Movies</h1>

      {/* Movies Grid */}
      <div className="overflow-x-auto pb-4">
        <div className="group flex flex-wrap gap-4 mt-4 w-max">
          {nowPlayingMovies.map((movie) => (
            <div
              className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:translate-y-1 transition duration-300`}
              key={movie.id}
            >
              <div
                onClick={() => setSelectedMovies(movie.id)}
                className="relative rounded-lg overflow-hidden"
              >
                <img
                  src={movie.poster_path}
                  alt=""
                  className="w-full object-cover brightness-90"
                />
                <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
                  <p className="flex items-center gap-1 text-gray-400">
                    <StarIcon className="w-4 h-4 text-pink-700 fill-pink-700" />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className="text-gray-300">
                    {(movie.vote_count / 1000).toFixed(1)}K Votes
                  </p>
                </div>
              </div>
              {selectedMovies === movie.id && (
                <div className="absolute top-2 right-2 flex items-center justify-center bg-pink-700 h-6 w-6 rounded">
                  <CheckIcon
                    className="w-4 h-4 text-white"
                    strokeWidth={2.5}
                  />
                </div>
              )}
              <p className="font-medium truncate">{movie.title}</p>
              <p className="text-gray-400 text-sm">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Show Price Input */}
      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">Show Price</label>
        <div className="inline-flex items-center gap-2 border border-gray-600 p-2 rounded-md bg-gray-900">
          <p className="text-gray-400 text-sm">{currency}</p>
          <input
            type="number"
            min={0}
            value={showPrice}
            placeholder="Enter Show Price"
            onChange={(e) => setShowPrice(e.target.value)}
            className="bg-gray-900 text-gray-100 placeholder-gray-500 outline-none rounded-md p-1 w-full focus:ring-2 "
          />
        </div>
      </div>

      {/* Date & Time Selection */}
      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">
          Select Date & Time
        </label>
        <div className="inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg bg-gray-900">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="bg-gray-900 text-gray-100 placeholder-gray-500 outline-none rounded-md p-2 focus:ring-2 "
          />
          <button
            onClick={handleDateTimeAdd}
            className="bg-pink-700 text-white px-4 py-1 text-lg rounded-lg hover:bg-pink-600 cursor-pointer transition-colors"
          >
            Add Time
          </button>
        </div>
      </div>

      {/* Display Selected Date & Time */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2 font-semibold text-lg">Selected Date-Time</h2>
          <ul className="space-y-3">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <li key={date}>
                <div className="font-medium">{date}</div>
                <div className="flex flex-wrap gap-2 mt-1 text-sm">
                  {times.map((time) => (
                    <div
                      key={time}
                      className="border border-pink-600 px-2 py-1 flex items-center rounded bg-gray-900 text-gray-100"
                    >
                      <span>{time}</span>
                      <DeleteIcon
                        onClick={() => handleRemoveTime(date, time)}
                        width={15}
                        className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  ) : (
    <Loading />
  );
};

export default AddShows;

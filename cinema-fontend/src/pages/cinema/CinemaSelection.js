import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCinemas } from '../../service/cinemaService';


const CinemaSelection = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const movieId = queryParams.get("movieId"); 

  const [cinemas, setCinemas] = useState([]);
  useEffect(() => {
    fetchCinemas();
  },[]);

  const fetchCinemas = async () => {
    const res = await getCinemas(movieId);
    setCinemas(res.data.data);
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Chọn Rạp Chiếu
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cinemas.map((cinema) => (
          <div
            key={cinema.cinemaId}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            {/* Map Image */}
            <img
              src={"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/97/27/16/cinema-rex.jpg?w=1200&h=-1&s=1"}
              alt={`Bản đồ của ${cinema.cinemaName}`}
              className="w-full h-48 object-cover"
            />
            {/* Cinema Info */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {cinema.cinemaName}
              </h2>
              <p className="text-gray-600">{cinema.cinemaAddress}</p>
              <Link to={`/booking?movieId=${movieId}&cinemaId=${cinema.cinemaId}`}  
                    className="mt-4 block w-full py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded text-center transition duration-300">
                Chọn
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CinemaSelection;

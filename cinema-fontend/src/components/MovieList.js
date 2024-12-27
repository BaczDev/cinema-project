import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../service/movieService';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() =>{
    getListMovies();
  },[]);
  const getListMovies = async () => {
    const res = await getMovies();
    setMovies(res.data.data);
  }


  return (
    <section className="flex flex-col min-h-screen">
      <div className="flex-grow p-6">
        <h2 className="text-2xl font-bold mb-4">Danh Sách Phim</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div key={movie.movieId} className="bg-gray-200 p-4 rounded-md shadow-lg w-96 max-w-xs mx-auto">
              <img 
                src={movie.moviePosterUrl} 
                alt={movie.title} 
                className="w-full h-96 object-cover rounded-md mb-4" 
              />
              <h3 className="text-xl font-semibold">{movie.movieName}</h3>
              <p>Thời lượng: {movie.movieLength} phút</p>
              {/* Các nút */}
              <div className="mt-4 flex justify-between">
                <Link to={`/movieDetail?movieId=${movie.movieId}`} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-center">Chi tiết</Link>
                <Link 
                  to={`/cinema?movieId=${movie.movieId}`} 
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                >
                  Mua vé
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieList;

import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const movies = [
    { id: 1, title: 'Movie 1', description: 'Description of Movie 1', imageUrl: 'https://cdn.marvel.com/content/1x/deadpoolandwolverine_lob_crd_03.jpg', movieLength: '130' },
    { id: 2, title: 'Movie 2', description: 'Description of Movie 2', imageUrl: 'https://via.placeholder.com/300x200?text=Movie+2', movieLength: '120' },
    { id: 3, title: 'Movie 3', description: 'Description of Movie 3', imageUrl: 'https://via.placeholder.com/300x200?text=Movie+3', movieLength: '110' },
    { id: 4, title: 'Movie 4', description: 'Description of Movie 4', imageUrl: 'https://via.placeholder.com/300x200?text=Movie+4', movieLength: '90' },
    { id: 5, title: 'Movie 5', description: 'Description of Movie 5', imageUrl: 'https://via.placeholder.com/300x200?text=Movie+5', movieLength: '95' },
    { id: 6, title: 'Movie 6', description: 'Description of Movie 6', imageUrl: 'https://via.placeholder.com/300x200?text=Movie+6', movieLength: '130' },
  ];

  return (
    <section className="flex flex-col min-h-screen">
      <div className="flex-grow p-6">
        <h2 className="text-2xl font-bold mb-4">Danh Sách Phim</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-gray-200 p-4 rounded-md shadow-lg w-96 max-w-xs mx-auto">
              <img 
                src={movie.imageUrl} 
                alt={movie.title} 
                className="w-full h-96 object-cover rounded-md mb-4" 
              />
              <h3 className="text-xl font-semibold">{movie.title}</h3>
              <p>{movie.description}</p>
              <p>Thời lượng: {movie.movieLength} phút</p>
              {/* Các nút */}
              <div className="mt-4 flex justify-between">
                <Link to={`/movie/${movie.id}`} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-center">Chi tiết</Link>
                <Link 
                  to={`/booking/${movie.id}`} 
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

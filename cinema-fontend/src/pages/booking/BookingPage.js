import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const BookingPage = () => {
  const { id } = useParams();

  const movies = {
    1: {
      title: 'Người Nhện: Không Còn Nhà',
      director: 'Jon Watts',
      imageUrl: 'https://cdn.marvel.com/content/1x/deadpoolandwolverine_lob_crd_03.jpg',
      showtimes: [
        { time: '10:00 AM', theater: 'Rạp Galaxy Nguyễn Du', room: '101', showDate: '2024-12-17' },
        { time: '1:00 PM', theater: 'Rạp Galaxy Tân Bình', room: '102', showDate: '2024-12-17' },
        { time: '4:00 PM', theater: 'Rạp CGV Vincom', room: '101', showDate: '2024-12-17' },
        { time: '7:00 PM', theater: 'Rạp Lotte Landmark', room: '101', showDate: '2024-12-17' },
      ],
    },
    2: {
      title: 'Movie 2',
      imageUrl: 'https://via.placeholder.com/300x200?text=Movie+2',
      showtimes: [
        { time: '11:00 AM', theater: 'Rạp CGV Crescent Mall', room: '101', showDate: '2024-12-17' },
        { time: '2:00 PM', theater: 'Rạp Galaxy Nguyễn Trãi', room: '101', showDate: '2024-12-17' },
        { time: '5:00 PM', theater: 'Rạp Lotte Phú Thọ', room: '101', showDate: '2024-12-17' },
        { time: '8:00 PM', theater: 'Rạp CGV Parkson', room: '101', showDate: '2024-12-17' },
      ],
    },
  };

  const movie = movies[id];

  if (!movie) {
    return <div className="p-6 text-center text-xl">Movie not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mx-auto p-6">
        <div className="flex flex-col items-center gap-8 mb-8">
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-64 h-auto rounded-md shadow-lg"
            />
          </div>
          <div className="w-full md:w-2/3 text-center">
            <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Lịch Chiếu</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                {movie.showtimes.map((showtime, index) => (
                  <Link
                    key={index}
                    to={`/booking/${id}/seat/${showtime}`}
                    state={{
                      title: movie.title,
                      showtime: showtime.time,
                      theater: showtime.theater,
                      room: showtime.room,
                      showDate: showtime.showDate
                    }}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    {showtime.time}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

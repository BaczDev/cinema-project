import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {getMovie} from '../../service/movieService';
import { getShowtimeByCinemaAndMovie, getShowtimeByCriteria } from '../../service/showtimeService';
import { getCinemaWithId } from '../../service/cinemaService';
import { getRoomWithId } from '../../service/roomService';

const BookingPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieId = queryParams.get("movieId");
  const cinemaId = queryParams.get("cinemaId");
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]); // Lưu tất cả các suất chiếu của phim
  const [selectedDate, setSelectedDate] = useState(null); // Lưu ngày chiếu được chọn
  const [filteredShowtimes, setFilteredShowtimes] = useState([]); // Lưu các suất chiếu đã lọc theo ngày
  const [cinema, setCinema] = useState(null);
  const [rooms, setRooms] = useState({});

  useEffect(() => {
    fetchMovie();
    fetchShowtimeByCinemaAndMovie();
    fetchCinema();
  },[movieId, cinemaId]);

  const fetchMovie = async () => {
    try {
      const res = await getMovie(movieId);
      setMovie(res.data.data);
    } catch (error) {
      console.error("Có lỗi xảy ra khi tải phim:", error);
    }
  };

  const fetchShowtimeByCinemaAndMovie = async () => {
    const res = await getShowtimeByCinemaAndMovie(cinemaId, movieId);
    setShowtimes(res.data.data);
  }

  const fetchShowtimeByCriteria = async (selectedDate) => {
    const res = await getShowtimeByCriteria(cinemaId, movieId, selectedDate);
    setFilteredShowtimes(res.data.data);
  }

  const fetchCinema = async () => {
    const res = await getCinemaWithId(cinemaId);
    setCinema(res.data.data); 
  }

  const fetchRoom = async (roomId) => {
    if (rooms[roomId]) return; // Nếu đã có thông tin phòng chiếu thì không cần gọi lại API
  try {
    const token = localStorage.getItem("token");
    const res = await getRoomWithId(token, roomId);
    setRooms((prevRooms) => ({ ...prevRooms, [roomId]: res.data.data })); // Lưu thông tin theo roomId
  } catch (error) {
    console.error("Có lỗi xảy ra khi tải thông tin phòng:", error);
  }
  }

  if (!movie || !showtimes.length) {
    return <div>Loading...</div>; // Hiển thị khi dữ liệu chưa được tải
  }

  // Lấy danh sách các ngày chiếu từ showtimes
  const dates = [...new Set(showtimes.map(showtime => showtime.showDate))];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mx-auto p-6">
        <div className="flex flex-col items-center gap-8 mb-8">
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src={movie.moviePosterUrl}
              alt={movie.movieName}
              className="w-64 h-auto rounded-md shadow-lg"
            />
          </div>
          <div className="w-full md:w-2/3 text-center">
            <h2 className="text-3xl font-bold mb-4">{movie.movieName}</h2>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Lịch Chiếu</h3>

              {/* Danh sách các ngày chiếu */}
              <div className="flex flex-wrap gap-4 justify-center mb-6">
                {dates.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedDate(date);
                      fetchShowtimeByCriteria(date);
                    }}
                    className={`py-2 px-4 rounded-md ${
                      selectedDate === date
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>

              {/* Danh sách các suất chiếu (chỉ hiện khi đã chọn ngày) */}
              {selectedDate && (
                <div className="flex flex-wrap gap-4 justify-center">
                  {filteredShowtimes.length > 0 ? (
                    filteredShowtimes.map((showtime, index) => {
                      const { roomId } = showtime; // Lấy roomId từ showtime
                      
                      // Gọi API để lấy thông tin phòng chiếu nếu chưa có
                      if (roomId && !rooms[roomId]) {
                        fetchRoom(roomId);
                      }

                      const room = rooms[roomId]; // Lấy thông tin phòng chiếu từ state

                      return (
                        <Link
                          key={index}
                          to={`/seatSelected?cinemaId=${cinemaId}&&movieId=${movieId}&&showtimeId=${showtime.showtimeId}&&roomId=${roomId}`}
                          state={{
                            movieName: movie.movieName,
                            showtime: showtime.startTime,
                            cinema: cinema.cinemaName, // Thêm tên cinema vào state
                            room: room ? room.roomName : "Loading...",
                            showDate: showtime.showDate,
                          }}
                          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                          {showtime.startTime}
                        </Link>
                      );
                    })
                  ) : (
                    <p className="text-gray-500">Không có suất chiếu cho ngày này.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

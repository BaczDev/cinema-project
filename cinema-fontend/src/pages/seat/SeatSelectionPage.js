import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSeatWithRoomId } from '../../service/seatService';
import { createBooking } from '../../service/bookingService';
import { getProfile } from '../../service/userService';
import { getBookingHistory, getAllBooking } from '../../service/bookingService';

const SeatSelectionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const movieId = queryParams.get('movieId');
  const cinemaId = queryParams.get('cinemaId');
  const showtimeId = queryParams.get('showtimeId');
  const roomId = queryParams.get('roomId');
  const { movieName, showtime, cinema, room, showDate } = location.state || {}; // Props from Link

  const [seats, setSeats] = useState([]); // List of seats
  const [selectedSeats, setSelectedSeats] = useState([]); // Selected seats
  const [user, setUser] = useState(null); // User information

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user && roomId) {
      fetchSeats();
    }
  }, [user, roomId]);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn cần đăng nhập để thực hiện thao tác này!');
      return;
    }

    try {
      const res = await getProfile(token);
      setUser(res.data.data); // Store user information in state
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy thông tin người dùng:', error);
    }
  };

  const fetchSeats = async () => {
  const token = localStorage.getItem('token');
  try {
    // Lấy danh sách booking trước
    const bookingHistoryResponse = await getAllBooking(token, user.userId);
    console.log('Lịch sử đặt:', bookingHistoryResponse.data.data);
    const bookedSeatIds = new Set(
      bookingHistoryResponse.data.data.flatMap((booking) => booking.seatId)
    );

    // Lấy danh sách ghế
    const seatResponse = await getSeatWithRoomId(token, roomId);
    const rawSeats = seatResponse.data.data;

    // Xử lý danh sách ghế, đánh dấu ghế đã được đặt
    const processedSeats = rawSeats.map((seat) => ({
      id: seat.seatId,
      number: `${String.fromCharCode(64 + seat.rowSeat)}${seat.number}`,
      type: seat.rowSeat <= 4 ? 'standard' : 'vip',
      price: seat.rowSeat <= 4 ? 50000 : 65000,
      isBooked: bookedSeatIds.has(seat.seatId), // Kiểm tra nếu seatId đã được đặt
    }));
    setSeats(processedSeats);
  } catch (error) {
    console.error('Có lỗi xảy ra khi tải danh sách ghế hoặc lịch sử đặt:', error);
  }
};


  const handleSeatSelect = (seat) => {
    if (seat.isBooked) {
      console.warn(`Seat ${seat.number} đã được đặt, không thể chọn.`);
      return; // Không xử lý nếu ghế đã đặt
    }
    setSelectedSeats((prevSelectedSeats) => {
      const isAlreadySelected = prevSelectedSeats.find((s) => s.id === seat.id);
      if (isAlreadySelected) {
        return prevSelectedSeats.filter((s) => s.id !== seat.id);
      } else {
        return [...prevSelectedSeats, seat];
      }
    });
  };

  const handlePayment = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn cần đăng nhập để thực hiện thao tác này!');
      return;
    }

    if (!user) {
      console.error('Không tìm thấy thông tin người dùng. Vui lòng thử lại!');
      return;
    }

    try {
      const seatIds = selectedSeats.map((seat) => seat.id);

      const bookingResponse = await createBooking(
        token,
        user.userId, // Use userId from state
        Number(cinemaId),
        Number(movieId),
        seatIds,
        Number(showtimeId)
      );

      const bookingIds = bookingResponse.data.data.map((booking) => booking.bookingId);

      alert('Đặt vé thành công!');
      fetchSeats();
      setSelectedSeats([]);

      navigate('/payment-history', {
        state: {
          movieName,
          cinema,
          date: showtime,
          room,
          seat: selectedSeats.map((seat) => seat.number).join(', '),
          showDate,
          bookingIds,
        },
      });
    } catch (error) {
      
          alert('Một hoặc nhiều ghế bạn chọn đã được đặt trước. Vui lòng chọn ghế khác!');
          fetchSeats();
    }
  };

  if (!movieName || !showtime || !cinema || !room || !showDate) {
    return <div className="p-6 text-center text-xl">Thông tin phim không đầy đủ. Vui lòng quay lại và thử lại.</div>;
  }

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 min-h-screen">
          {/* Left: Screen and seat list */}
          <div className="w-full md:w-2/3 flex flex-col items-center">
            <div className="w-full h-4 bg-gray-800 mb-6 flex justify-center items-center text-white">
              <span>Màn hình</span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2 mb-4">
              {seats.map((seat) => (
                <button
                  key={seat.id}
                  className={`w-10 h-10 sm:w-12 sm:h-12 text-white rounded-md text-xs sm:text-sm 
                    ${seat.isBooked ? 'bg-gray-500 cursor-not-allowed' : ''}
                    ${!seat.isBooked && seat.type === 'standard' ? 'bg-green-500 hover:bg-green-600' : ''}
                    ${!seat.isBooked && seat.type === 'vip' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
                    ${selectedSeats.find((s) => s.id === seat.id) ? 'ring-2 ring-blue-500' : ''}
                  `}
                  onClick={() => handleSeatSelect(seat)}
                  disabled={seat.isBooked}
                >
                  {seat.number}
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-green-500 rounded-md"></span>
                <span>Ghế Thường</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-yellow-500 rounded-md"></span>
                <span>Ghế VIP</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-gray-500 rounded-md"></span>
                <span>Ghế Đã Đặt</span>
              </div>
            </div>
          </div>

          {/* Right: Information */}
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{movieName}</h2>
            <p className="text-lg md:text-xl">Lịch Chiếu: {showtime}</p>
            <p className="text-lg md:text-xl mt-2">Ngày Chiếu: {showDate}</p>
            <p className="text-lg md:text-xl mt-2">Rạp: {cinema}</p>
            <div className="mt-4">
              <h3 className="text-lg md:text-xl font-bold mb-2">Ghế đã chọn:</h3>
              {selectedSeats.length > 0 ? (
                <ul className="space-y-2">
                  {selectedSeats.map((seat) => (
                    <li key={seat.id} className="flex justify-between">
                      <span>{seat.number} ({seat.type === 'standard' ? 'Thường' : 'VIP'})</span>
                      <span>{seat.price.toLocaleString()} VND</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Chưa chọn ghế nào.</p>
              )}
            </div>
            <div className="mt-4 border-t pt-4">
              <h3 className="text-lg md:text-xl font-bold">Tổng tiền: {totalPrice.toLocaleString()} VND</h3>
            </div>
            {selectedSeats.length > 0 && (
              <div className="mt-6">
                <button
                  onClick={handlePayment}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                  Thanh Toán
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionPage;

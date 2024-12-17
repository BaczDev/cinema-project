import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const SeatSelectionPage = () => {
  const location = useLocation();
  const { title, showtime, theater, room, showDate } = location.state || {}; // Nhận props từ Link

  const [selectedSeats, setSelectedSeats] = useState([]); // Lưu trữ danh sách ghế đã chọn

  if (!title || !showtime || !theater || !room || !showDate) {
    return <div className="p-6 text-center text-xl">Thông tin phim không đầy đủ. Vui lòng quay lại và thử lại.</div>;
  }

  const seats = Array.from({ length: 100 }, (_, index) => {
    const row = Math.floor(index / 10);
    const seatType = row < 4 ? 'standard' : 'vip';
    const price = seatType === 'standard' ? 50000 : 65000;
    return {
      id: index + 1,
      number: `${String.fromCharCode(65 + row)}${(index % 10) + 1}`,
      status: index % 5 === 0 ? 'occupied' : 'available',
      type: seatType,
      price: price,
    };
  });

  const handleSeatSelect = (seat) => {
    if (seat.status === 'occupied') return;
    setSelectedSeats((prevSelectedSeats) => {
      const isAlreadySelected = prevSelectedSeats.find((s) => s.id === seat.id);
      if (isAlreadySelected) {
        return prevSelectedSeats.filter((s) => s.id !== seat.id);
      } else {
        return [...prevSelectedSeats, seat];
      }
    });
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-6 md:gap-12  min-h-screen">
  {/* Bên trái: Màn hình và danh sách ghế */}
  <div className="w-full md:w-2/3 flex flex-col items-center">
    {/* Màn hình */}
    <div className="w-full h-4 bg-gray-800 mb-6 flex justify-center items-center text-white">
      <span>Màn hình</span>
    </div>

    {/* Danh sách ghế */}
    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2 mb-4">
      {seats.map((seat) => (
        <button
          key={seat.id}
          className={`w-10 h-10 sm:w-12 sm:h-12 text-white rounded-md text-xs sm:text-sm 
            ${seat.status === 'occupied' ? 'bg-gray-500 cursor-not-allowed' : ''}
            ${seat.type === 'standard' && seat.status === 'available' ? 'bg-green-500 hover:bg-green-600' : ''}
            ${seat.type === 'vip' && seat.status === 'available' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
            ${selectedSeats.find((s) => s.id === seat.id) ? 'ring-2 ring-blue-500' : ''}
          `}
          onClick={() => handleSeatSelect(seat)}
          disabled={seat.status === 'occupied'}
        >
          {seat.number}
        </button>
      ))}
    </div>

    {/* Chú thích loại ghế */}
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

  {/* Bên phải: Thông tin */}
  <div className="w-full md:w-1/3">
    <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
    <p className="text-lg md:text-xl">Lịch Chiếu: {showtime}</p>
    <p className="text-lg md:text-xl mt-2">Rạp: {theater}</p>
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
        
        <Link
            to="/payment-history"
            state={{
              title: title,
              theater: theater,
              date: showtime,
              room: room,
              seat: selectedSeats.map((seat) => seat.number).join(', '),
              showDate: showDate
            }}
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Thanh Toán
        </Link>


    </div>
    )}
  </div>
</div>

      </div>
    </div>
  );
};

export default SeatSelectionPage;

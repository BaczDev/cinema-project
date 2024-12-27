import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentHistoryPage = () => {
  const location = useLocation();
  const { movieName, cinema, date, room, seat, showDate, bookingIds } = location.state || {}; // Nhận dữ liệu từ state
  console.log('Received state in PaymentHistoryPage:', location.state);

  // Nếu có `bookingIds` và `seat`, tạo danh sách booking
  const bookings = bookingIds && seat
    ? seat.split(', ').map((seatNumber, index) => ({
        id: bookingIds[index], // Sử dụng `bookingId` từ danh sách nhận được
        movieName,
        cinema,
        date,
        room,
        seat: seatNumber,
        showDate,
      }))
    : [];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Lịch Sử Mua Vé</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Mã Vé</th>
                <th className="py-2 px-4 text-left">Tên Phim</th>
                <th className="py-2 px-4 text-left">Tên Rạp</th>
                <th className="py-2 px-4 text-left">Suất Chiếu</th>
                <th className="py-2 px-4 text-left">Phòng</th>
                <th className="py-2 px-4 text-left">Ghế</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="py-2 px-4">{booking.id}</td>
                    <td className="py-2 px-4">{booking.movieName}</td>
                    <td className="py-2 px-4">{booking.cinema}</td>
                    <td className="py-2 px-4">
                      {booking.date}, {booking.showDate}
                    </td>
                    <td className="py-2 px-4">{booking.room}</td>
                    <td className="py-2 px-4">{booking.seat}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-2 px-4 text-center">
                    Không có thông tin đặt vé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryPage;

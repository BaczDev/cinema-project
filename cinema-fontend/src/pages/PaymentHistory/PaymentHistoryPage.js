import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';


// Hàm tạo chuỗi random 10 ký tự
const generateRandomString = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};
const PaymentHistoryPage = () => {
  const location = useLocation();
  const { title, theater, date, room, seat, showDate } = location.state || {}; // Nhận dữ liệu từ state
  console.log('Received state in PaymentHistoryPage:', location.state);

  // Nếu `seat` chứa nhiều ghế, tạo danh sách booking
  const bookings = seat
    ? seat.split(', ').map((seatNumber, index) => ({
        id: `${index + 1}-${generateRandomString()}`,   // Mã vé = id + chuỗi random
        title,
        theater,
        date,
        room,
        seat: seatNumber,
        showDate
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
                    <td className="py-2 px-4">{booking.title}</td>
                    <td className="py-2 px-4">{booking.theater}</td>
                    <td className="py-2 px-4">{booking.date}, {booking.showDate}</td>
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

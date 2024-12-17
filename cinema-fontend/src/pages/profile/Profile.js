import React, { useState } from 'react';

const Profile = () => {
  // Dữ liệu thông tin cá nhân (giả lập)
  const [userData, setUserData] = useState({
    username: 'Hoang',
    email: 'phamhuyhoang@gmail.com',
    phone: '0123-456-789',
    accountType: 'KhachHang',
  });

  // Dữ liệu lịch sử mua vé (giả lập)
  const ticketHistory = [
    { id: 'V001', movie: 'Avengers: Endgame', cinema: 'Bacz Cinema - Hà Nội', showtime: '2024-06-01 | 19:00', room: 'Phòng 1', seat: 'A12' },
    { id: 'V002', movie: 'Spider-Man: No Way Home', cinema: 'Bacz Cinema - Hà Nội', showtime: '2024-06-05 | 21:30', room: 'Phòng 2', seat: 'B7' },
    { id: 'V003', movie: 'The Batman', cinema: 'Bacz Cinema - TP HCM', showtime: '2024-06-10 | 20:00', room: 'Phòng 3', seat: 'C5' },
    { id: 'V004', movie: 'Inception', cinema: 'Bacz Cinema - Hà Nội', showtime: '2024-06-15 | 18:30', room: 'Phòng 4', seat: 'D10' },
    { id: 'V005', movie: 'Interstellar', cinema: 'Bacz Cinema - TP HCM', showtime: '2024-06-20 | 22:00', room: 'Phòng 5', seat: 'E8' },
    { id: 'V006', movie: 'Joker', cinema: 'Bacz Cinema - Đà Nẵng', showtime: '2024-06-25 | 17:00', room: 'Phòng 6', seat: 'F3' },
  ];

  // Trạng thái mở form thay đổi thông tin
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    email: userData.email,
    phone: userData.phone,
    password: '',
  });

  // Xử lý thay đổi input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData((prev) => ({
      ...prev,
      email: formData.email,
      phone: formData.phone,
    }));
    setShowEditForm(false);
    alert('Thông tin đã được cập nhật thành công!');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Thông tin người dùng */}
          <div className="w-full md:w-1/3 p-6 border-b md:border-r border-gray-300">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-300 flex items-center justify-center text-4xl md:text-5xl text-white font-bold rounded-full mx-auto mb-6">
              H
            </div>
            <h1 className="text-xl md:text-2xl font-semibold text-center mb-4">
              Thông tin người dùng
            </h1>
            <div className="space-y-4">
              <div>
                <label className="block font-medium">Tên Đăng Nhập:</label>
                <input
                  type="text"
                  value={userData.username}
                  readOnly
                  className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
                />
              </div>
              <div>
                <label className="block font-medium">Email:</label>
                <input
                  type="email"
                  value={userData.email}
                  readOnly
                  className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
                />
              </div>
              <div>
                <label className="block font-medium">Số Điện Thoại:</label>
                <input
                  type="text"
                  value={userData.phone}
                  readOnly
                  className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
                />
              </div>
              <div>
                <label className="block font-medium">Loại Tài Khoản:</label>
                <input
                  type="text"
                  value={userData.accountType}
                  readOnly
                  className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
                />
              </div>
            </div>
            <div className="text-center mt-6">
              <button
                onClick={() => setShowEditForm(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Thay đổi thông tin
              </button>
            </div>
          </div>

          {/* Lịch sử mua vé */}
          <div className="w-full md:w-2/3 p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
              Lịch sử mua vé
            </h2>
            <div className="max-h-96 overflow-y-auto border rounded-md shadow-inner">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 px-2 py-2">Mã Vé</th>
                    <th className="border border-gray-300 px-2 py-2">Tên Phim</th>
                    <th className="border border-gray-300 px-2 py-2">Tên Rạp</th>
                    <th className="border border-gray-300 px-2 py-2">Suất Chiếu</th>
                    <th className="border border-gray-300 px-2 py-2">Phòng</th>
                    <th className="border border-gray-300 px-2 py-2">Ghế</th>
                  </tr>
                </thead>
                <tbody>
                  {ticketHistory.map((ticket) => (
                    <tr key={ticket.id} className="text-center hover:bg-gray-100">
                      <td className="border border-gray-300 px-2 py-2">{ticket.id}</td>
                      <td className="border border-gray-300 px-2 py-2">{ticket.movie}</td>
                      <td className="border border-gray-300 px-2 py-2">{ticket.cinema}</td>
                      <td className="border border-gray-300 px-2 py-2">{ticket.showtime}</td>
                      <td className="border border-gray-300 px-2 py-2">{ticket.room}</td>
                      <td className="border border-gray-300 px-2 py-2">{ticket.seat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showEditForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Thay đổi thông tin
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Số Điện Thoại:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Mật Khẩu:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Nhập mật khẩu mới"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEditForm(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

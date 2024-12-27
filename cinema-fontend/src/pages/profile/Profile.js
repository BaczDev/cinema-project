import React, { useEffect, useState } from "react";
import { getProfile } from "../../service/userService";
import { getBookingHistory } from "../../service/bookingService";
import { updateByUser } from "../../service/userService";
const Profile = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    role: {
      roleName: "",
    },
  });
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const getData = async () => {
    try {
      if (token) {
        const res = await getProfile(token);
        setData(res.data.data);
        console.log(res.data.data);
        setIsDataLoaded(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPaymentHistory = async () => {
    try {
      if (token) {
        const res = await getBookingHistory(token, data.userId);
        setPaymentHistory(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isDataLoaded) {
      // Kiểm tra xem dữ liệu đã được tải chưa
      getPaymentHistory();
    }
  }, [isDataLoaded]);

  

  // Trạng thái mở form thay đổi thông tin
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    email: data.email,
    phone: data.phone,
    password: "",
  });

  
  useEffect(() => {
    setFormData({
      email: data.email,
      phone: data.phoneNumber,
      password: "",
    });
  }, [data, showEditForm]);

  // Xử lý thay đổi input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xử lý submit form
  // Xử lý submit form
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (token && data.userId) {
      // Gọi API để cập nhật thông tin
      const response = await updateByUser(
        token,
        data.userId,
        formData.password,
        formData.email,
        formData.phone
      );
      
      if (response.status === 200) {
        // Cập nhật lại dữ liệu hiển thị
        setData((prev) => ({
          ...prev,
          email: formData.email,
          phoneNumber: formData.phone,
        }));
        alert("Thông tin đã được cập nhật thành công!");
        setShowEditForm(false);
      }
    }
  } catch (error) {
    console.error("Có lỗi xảy ra khi cập nhật thông tin:", error);
    alert("Cập nhật thông tin thất bại. Vui lòng thử lại!");
  }
};


  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Thông tin người dùng */}
          <div className="w-full md:w-1/3 p-6 border-b md:border-r border-gray-300">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-300 flex items-center justify-center text-4xl md:text-5xl text-white font-bold rounded-full mx-auto mb-6 overflow-hidden">
            <img
                src="https://cdn.vntre.vn/default/avatar-meo-1724730902.jpg"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-xl md:text-2xl font-semibold text-center mb-4">
              Thông tin người dùng
            </h1>
            <div className="space-y-4">
              <div>
                <label className="block font-medium">Tên Đăng Nhập:</label>
                <input
                  type="text"
                  value={data.userName}
                  readOnly
                  className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
                />
              </div>
              <div>
                <label className="block font-medium">Email:</label>
                <input
                  type="email"
                  value={data.email}
                  readOnly
                  className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
                />
              </div>
              <div>
                <label className="block font-medium">Số Điện Thoại:</label>
                <input
                  type="text"
                  value={data.phoneNumber}
                  readOnly
                  className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
                />
              </div>
              <div>
                <label className="block font-medium">Loại Tài Khoản:</label>
                <input
                  type="text"
                  value={data.role.roleName}
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
                    <th className="border border-gray-300 px-2 py-2">
                      Tên Phim
                    </th>
                    <th className="border border-gray-300 px-2 py-2">
                      Tên Rạp
                    </th>
                    <th className="border border-gray-300 px-2 py-2">
                      Suất Chiếu
                    </th>
                    <th className="border border-gray-300 px-2 py-2">Phòng</th>
                    <th className="border border-gray-300 px-2 py-2">Ghế</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment) => (
                    <tr
                      key={payment.bookingId}
                      className="text-center hover:bg-gray-100"
                    >
                      <td className="border border-gray-300 px-2 py-2">
                        {payment.bookingId}
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        {payment.movieName}
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        {payment.cinemaName}
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        {payment.showDate} | {payment.startTime} 
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        {payment.roomName}
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        {`${String.fromCharCode(64 + payment.rowSeat)}${payment.number}`}
                      </td>
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

import React, { useState } from 'react';

const UserManager = () => {
  const [users, setUsers] = useState([
    { id: 1, username: 'hoang123', phone: '0123456789', email: 'hoang@gmail.com', role: 'user' },
    { id: 2, username: 'trithuc456', phone: '0987654321', email: 'trithuc@gmail.com', role: 'admin' },
  ]);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Kiểm tra popup có mở không
  const [selectedUser, setSelectedUser] = useState(null); // Lưu người dùng được chọn để chỉnh sửa
  const [updatedUser, setUpdatedUser] = useState({
    phone: '',
    email: '',
    role: '',
  });

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setUpdatedUser({
      phone: user.phone,
      email: user.email,
      role: user.role,
    });
    setIsEditModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateUser = () => {
    // Cập nhật người dùng
    setUsers(
      users.map((user) =>
        user.id === selectedUser.id ? { ...user, ...updatedUser } : user
      )
    );
    setIsEditModalOpen(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quản lý Người Dùng</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Tên Đăng Nhập</th>
            <th className="border border-gray-300 px-4 py-2">Số Điện Thoại</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Vai Trò</th>
            <th className="border border-gray-300 px-4 py-2">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{user.id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.username}</td>
              <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.role}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                  onClick={() => deleteUser(user.id)}
                >
                  Xóa
                </button>
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => openEditModal(user)}
                >
                  Sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup sửa thông tin người dùng */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Chỉnh Sửa Người Dùng</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block font-medium">Số Điện Thoại</label>
                <input
                  type="text"
                  name="phone"
                  value={updatedUser.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Vai Trò</label>
                <select
                  name="role"
                  value={updatedUser.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleUpdateUser}
                  className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
                >
                  Lưu
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManager;

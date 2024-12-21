import React, { useState } from "react";
import { useEffect } from "react";
import {
  getAllUsers,
  deleteUser,
  updateByAdmin,
} from "../../service/userService";
const UserManager = () => {
  const [users, setUsers] = useState([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Kiểm tra popup có mở không
  const [selectedUser, setSelectedUser] = useState(null); // Lưu người dùng được chọn để chỉnh sửa
  const [updatedUser, setUpdatedUser] = useState({
    phoneNumber: "",
    email: "",
    roleId: "",
    password: "",
  });

  useEffect(() => {
    getAll();
  }, []);

  const token = localStorage.getItem("token");
  //================================================================
  const getAll = async () => {
    let res = await getAllUsers(token);

    if (res && res.data && res.data.data) {
      setUsers(res.data.data);
    }
  };


  //================================================================
  const deleted = async (id) => {
    try {
      let res = await deleteUser(id, token);
      if (res.status === 200) {
        alert("Đã xóa người dùng ");
        getAll();
      }
    } catch (error) {
      alert("Xóa người dùng thất bại");
    }
  };

  const openEditModal = (user) => {
    console.log(user);
    setSelectedUser(user);
    setUpdatedUser({
      phoneNumber: user.phoneNumber,
      email: user.email,
      roleId: user.role.roleId,
      password: user.password,
    });
    setIsEditModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  console.log(selectedUser);
  const updatedData = {
    ...(updatedUser.password && { password: updatedUser.password }),
    phoneNumber: updatedUser.phoneNumber,
    email: updatedUser.email,
    roleId: updatedUser.roleId,
  };
  //================================================================
  const handleUpdateUser = async () => {
    try {
      const res = await updateByAdmin(selectedUser.userId, updatedData, token);

      if (res.status === 200) {
        alert("Cập nhật người dùng thành công!");
        getAll();
        setIsEditModalOpen(false);
      }
    } catch (error) {
      alert("Cập nhật người dùng thất bại!");
    }
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
              <td className="border border-gray-300 px-4 py-2">
                {user.userId}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.userName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.phoneNumber}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.role.roleName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                  onClick={() => deleted(user.userId)}
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
                  name="phoneNumber"
                  value={updatedUser.phoneNumber}
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
                  name="roleId"
                  value={updatedUser.roleId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="1">User</option>
                  <option value="2">Admin</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-medium">Mật Khẩu</label>
                <input
                  type="password"
                  name="password"
                  value={updatedUser.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Nhập mật khẩu mới"
                />
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

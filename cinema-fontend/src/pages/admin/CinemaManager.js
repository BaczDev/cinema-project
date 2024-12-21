import React, { useEffect, useState } from "react";
import {
  getCinemas,
  createCinema,
  updateCinema,
  deleteCinema,
  getRooms,
  createRoom,
} from "../../service/cinemaService";
const CinemaManager = () => {
  const [cinemas, setCinemas] = useState([]);

  const [showAddCinemaForm, setShowAddCinemaForm] = useState(false);
  const [showEditCinemaForm, setShowEditCinemaForm] = useState(false);
  const [newCinema, setNewCinema] = useState({
    cinemaName: "",
    cinemaAddress: "",
  });
  const [editCinema, setEditCinema] = useState({
    cinemaId: null,
    cinemaName: "",
    cinemaAddress: "",
  });
  const [showAddRoomForm, setShowAddRoomForm] = useState(false);
  const [selectedCinemaId, setSelectedCinemaId] = useState(null);
  const [newRoomName, setNewRoomName] = useState("");
  const [roomsByCinema, setRoomsByCinema] = useState({});

  const token = localStorage.getItem("token");
  useEffect(() => {
    getAllCinemas();
  }, []);

  // Lắng nghe khi cinemas đã được cập nhật
  useEffect(() => {
    if (cinemas.length > 0) {
      getRoomWithCinemaId();
    }
  }, [cinemas]);
  //================================================================================================
  //get room with cinemaId
  const getRoomWithCinemaId = async () => {
    try {
      const cinemaIds = cinemas.map((cinema) => cinema.cinemaId);
      console.log(cinemaIds);
      for (const cinemaId of cinemaIds) {
        const res = await getRooms(token, cinemaId);
        if (res.data.data) {
          setRoomsByCinema((prev) => ({
            ...prev,
            [cinemaId]: res.data.data, // Lưu phòng theo cinemaId
          }));
        }
      }
    } catch (error) {
      console.error("Lấy danh sách phòng thất bại:", error);
      alert("Không thể tải danh sách phòng. Vui lòng thử lại.");
    }
  };
  console.log(roomsByCinema);

  //================================================================================================
  //get list cinemas
  const getAllCinemas = async () => {
    let res = await getCinemas();
    if (res && res.data && res.data.data) {
      setCinemas(res.data.data);
    }
  };
  //================================================================================================

  // Thêm rạp mới
  const handleAddCinema = async () => {
    if (newCinema.cinemaName && newCinema.cinemaAddress) {
      try {
        const res = await createCinema(token, newCinema);
        if (res.status === 200) {
          alert("Thêm rạp thành công");
          getAllCinemas();
          setShowAddCinemaForm(false);
        }
      } catch (error) {
        alert("Thêm rạp thất bại");
      }
    } else {
      alert("Vui lòng nhập đầy đủ thông tin rạp!");
    }
  };

  //================================================================================================

  // Sửa thông tin rạp
  const handleEditCinema = async () => {
    if (editCinema.cinemaName && editCinema.cinemaAddress) {
      try {
        // Gọi API để cập nhật thông tin rạp
        const response = await updateCinema(
          token,
          editCinema.cinemaId,
          editCinema
        );

        // Cập nhật danh sách rạp trong state nếu API thành công
        if (response.status === 200) {
          setCinemas((prev) =>
            prev.map((cinema) =>
              cinema.cinemaId === editCinema.cinemaId
                ? {
                    ...cinema,
                    cinemaName: editCinema.cinemaName,
                    cinemaAddress: editCinema.cinemaAddress,
                  }
                : cinema
            )
          );
          alert("Cập nhật rạp thành công!");
          setShowEditCinemaForm(false);
          getAllCinemas(); // Làm mới danh sách từ API
        }
      } catch (error) {
        console.error("Cập nhật rạp thất bại:", error);
        alert("Cập nhật rạp thất bại. Vui lòng thử lại.");
      }
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  //================================================================================================

  // Thêm phòng cho rạp
  const handleAddRoom = async () => {
    if (!newRoomName) {
      alert("Vui lòng nhập tên phòng!");
      return;
    }
  
    try {
      // Gọi API tạo phòng
      const response = await createRoom(token, newRoomName, selectedCinemaId);
      if (response.status === 200) {
        alert("Thêm phòng thành công!");
  
        // Cập nhật danh sách phòng cho rạp được chọn
        setCinemas((prev) =>
          prev.map((cinema) =>
            cinema.cinemaId === selectedCinemaId
              ? {
                  ...cinema,
                  rooms: [...(cinema.rooms || []), { roomName: newRoomName }],
                }
              : cinema
          )
        );
  
        // Reset form
        setNewRoomName("");
        setShowAddRoomForm(false);
        getAllCinemas(); // Làm mới danh sách từ API
      }
    } catch (error) {
      console.error("Thêm phòng thất bại:", error);
      alert("Thêm phòng thất bại. Vui lòng thử lại.");
    }
  };
  
  //================================================================================================
  //xoa rap
  const handleDeleteCinema = async (cinemaId) => {
    try {
      // Gọi API để xóa rạp
      const response = await deleteCinema(token, cinemaId);

      if (response.status === 200) {
        alert("Xóa rạp thành công!");
        // Cập nhật lại danh sách rạp sau khi xóa
        setCinemas((prev) =>
          prev.filter((cinema) => cinema.cinemaId !== cinemaId)
        );
        getAllCinemas();
      }
    } catch (error) {
      console.error("Xóa rạp thất bại:", error);
      alert("Xóa rạp thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quản lý Rạp Phim</h2>

      {/* Nút Thêm Rạp */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-4"
        onClick={() => setShowAddCinemaForm(true)}
      >
        Thêm Rạp
      </button>

      {/* Bảng Danh Sách Rạp */}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Mã Rạp</th>
            <th className="border border-gray-300 px-4 py-2">Tên Rạp</th>
            <th className="border border-gray-300 px-4 py-2">Địa Chỉ</th>
            <th className="border border-gray-300 px-4 py-2">Phòng</th>
            <th className="border border-gray-300 px-4 py-2">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {cinemas.map((cinema) => (
            <tr key={cinema.id} className="text-center hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {cinema.cinemaId}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {cinema.cinemaName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {cinema.cinemaAddress}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {roomsByCinema[cinema.cinemaId] &&
                roomsByCinema[cinema.cinemaId].length > 0
                  ? roomsByCinema[cinema.cinemaId] // Lấy phòng theo cinemaId
                      .map((room) => room.roomName)
                      .join(", ") // Nối các tên phòng lại với nhau
                  : "Không có phòng"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                  onClick={() => {
                    setEditCinema({
                      cinemaId: cinema.cinemaId,
                      cinemaName: cinema.cinemaName,
                      cinemaAddress: cinema.cinemaAddress,
                    });
                    setShowEditCinemaForm(true);
                  }}
                >
                  Sửa
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                  onClick={() => handleDeleteCinema(cinema.cinemaId)}
                >
                  Xóa
                </button>
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => {
                    setSelectedCinemaId(cinema.cinemaId);
                    setShowAddRoomForm(true);
                  }}
                >
                  Thêm Phòng
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form Popup Thêm Rạp */}
      {showAddCinemaForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Thêm Rạp Mới</h3>
            <div className="mb-4">
              <label className="block font-medium">Tên Rạp</label>
              <input
                type="text"
                name="cinemaName"
                value={newCinema.cinemaName}
                onChange={(e) =>
                  setNewCinema({ ...newCinema, cinemaName: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Địa Chỉ</label>
              <input
                type="text"
                name="cinemaAddress"
                value={newCinema.cinemaAddress}
                onChange={(e) =>
                  setNewCinema({ ...newCinema, cinemaAddress: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleAddCinema}
            >
              Lưu
            </button>
            <button
              className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md"
              onClick={() => setShowAddCinemaForm(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* Form Popup Sửa Rạp */}
      {showEditCinemaForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Sửa Thông Tin Rạp</h3>
            <div className="mb-4">
              <label className="block font-medium">Tên Rạp</label>
              <input
                type="text"
                name="cinemaName"
                value={editCinema.cinemaName}
                onChange={(e) =>
                  setEditCinema({ ...editCinema, cinemaName: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Địa Chỉ</label>
              <input
                type="text"
                name="cinemaAddress"
                value={editCinema.cinemaAddress}
                onChange={(e) =>
                  setEditCinema({
                    ...editCinema,
                    cinemaAddress: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleEditCinema}
            >
              Lưu
            </button>
            <button
              className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md"
              onClick={() => setShowEditCinemaForm(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* Form Popup Thêm Phòng */}
      {showAddRoomForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Thêm Phòng</h3>
            <div className="mb-4">
              <label className="block font-medium">Tên Phòng</label>
              <input
                type="text"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleAddRoom}
            >
              Lưu
            </button>
            <button
              className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md"
              onClick={() => setShowAddRoomForm(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CinemaManager;

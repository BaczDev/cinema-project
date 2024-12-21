import React, { useEffect, useState } from "react";
import {
  getMovies,
  deleteMovie,
  addShowtime,
} from "../../service/movieService";
import { getCinemas, getRooms } from "../../service/cinemaService";

const FilmManager = ({ setSelectedFilm, setSelectedMenu }) => {
  const [films, setFilms] = useState([]);
  const [showAddSessionForm, setShowAddSessionForm] = useState(false);
  const [newSession, setNewSession] = useState({
    showDate: "",
    startTime: "",
    endTime: "",
    cinema: "",
    room: "", // Thêm trường phòng chiếu
  });

  const [cinemas, setCinemas] = useState([]); // Danh sách các rạp
  const [rooms, setRooms] = useState([]); // Danh sách phòng chiếu

  const token = localStorage.getItem("token");

  useEffect(() => {
    getListMovies();
    getListCinemas();
  }, []);
  //=======================================================================================================
  //lay danh sach phim
  const getListMovies = async () => {
    try {
      const res = await getMovies();
      if (res.data && res.data.data) {
        setFilms(res.data.data);
      }
    } catch (error) {}
  };

  //=======================================================================================================
  //lay danh sach rap
  const getListCinemas = async () => {
    try {
      const res = await getCinemas();
      if (res.data && res.data.data) {
        setCinemas(res.data.data);
      }
    } catch (error) {
      console.log("Lỗi khi lấy danh sách rạp", error);
    }
  };

  // Lấy danh sách phòng khi người dùng chọn rạp
  const handleCinemaChange = async (cinemaId) => {
    try {
      const res = await getRooms(token, cinemaId);
      console.log(res.data.data);
      if (res.data && res.data.data) {
        setRooms(res.data.data);
      }
    } catch (error) {
      console.log("Lỗi khi lấy danh sách phòng", error);
    }
  };

  // Thêm suất chiếu
  const handleSubmitSession = async (e) => {
    e.preventDefault();
    try {
      const { showDate, startTime, endTime, cinema, room, movieId } = newSession;
      console.log(newSession);
      
      const res = await addShowtime(token, showDate, startTime, endTime, movieId, cinema, room);
      
      if (res.status === 200) {
        alert('Suất chiếu đã được thêm!');
        setShowAddSessionForm(false); // Đóng form sau khi thêm suất chiếu
      }
    } catch (error) {
      console.log("Lỗi khi thêm suất chiếu", error);
      alert('Đã có lỗi xảy ra khi thêm suất chiếu');
    }
  };


  //=======================================================================================================
  const deleteFilm = async (movieId) => {
    const res = await deleteMovie(token, movieId);
    if (res.status === 200) {
      alert("Xóa thành công");
      getListMovies();
    }
  };

  const handleEditClick = (film) => {
    setSelectedFilm(film); // Lưu thông tin phim đang sửa
    setSelectedMenu("edit-film"); // Chuyển đến màn hình sửa phim
  };

  const handleAddSessionClick = (film) => {
    setShowAddSessionForm(true); // Hiện form thêm suất chiếu
  setNewSession((prevState) => ({
    ...prevState,
    movieId: film.movieId, // Lưu movieId vào state
  }));
  console.log(film.movieId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSession((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quản lý Phim</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Tên Phim</th>
            <th className="border border-gray-300 px-4 py-2">Thời Lượng</th>
            <th className="border border-gray-300 px-4 py-2">Hình Ảnh</th>
            <th className="border border-gray-300 px-4 py-2">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {films.map((film) => (
            <tr key={film.id} className="text-center hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {film.movieId}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {film.movieName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {film.movieLength} Phút
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={film.moviePosterUrl}
                  alt={film.title}
                  className="w-20 h-20 object-cover rounded"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                  onClick={() => deleteFilm(film.movieId)}
                >
                  Xóa
                </button>
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                  onClick={() => handleEditClick(film)} // Chuyển tới sửa phim
                >
                  Sửa
                </button>
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => handleAddSessionClick(film)} // Thêm suất chiếu cho phim
                >
                  Thêm Suất Chiếu
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form Thêm Suất Chiếu (Modal) */}
      {showAddSessionForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Thêm Suất Chiếu</h3>
            <form onSubmit={handleSubmitSession}>
              <div className="mb-4">
                <label className="block font-medium">Ngày Chiếu</label>
                <input
                  type="date"
                  name="showDate"
                  value={newSession.showDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Giờ Bắt Đầu</label>
                <input
                  type="time"
                  name="startTime"
                  value={newSession.startTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Giờ Kết Thúc</label>
                <input
                  type="time"
                  name="endTime"
                  value={newSession.endTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Chọn Rạp</label>
                <select
                  name="cinema"
                  value={newSession.cinema}
                  onChange={handleInputChange}
                  onBlur={(e) => handleCinemaChange(e.target.value)} // Tải phòng khi chọn rạp
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Chọn rạp</option>
                  {cinemas.map((cinema, index) => (
                    <option key={index} value={cinema.cinemaId}>
                      {cinema.cinemaName}
                    </option>
                  ))}
                </select>
              </div>
              {/* Phòng chiếu */}
              <div className="mb-4">
                <label className="block font-medium">Chọn Phòng</label>
                <select
                  name="room"
                  value={newSession.room}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Chọn phòng</option>
                  {rooms.map((room, index) => (
                    <option key={index} value={room.roomId}>
                      {room.roomName} {/* Hiển thị tên phòng */}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Lưu
              </button>
              <button
                type="button"
                className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md"
                onClick={() => setShowAddSessionForm(false)} // Đóng form
              >
                Hủy
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilmManager;

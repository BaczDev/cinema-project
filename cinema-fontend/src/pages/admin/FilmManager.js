import React, { useState } from 'react';

const FilmManager = ({ setSelectedFilm, setSelectedMenu }) => {
  const [films, setFilms] = useState([
    { 
      id: 1, 
      title: 'Avengers: Endgame', 
      duration: '180 phút',
      image: 'https://example.com/avengers.jpg',
    },
    { 
      id: 2, 
      title: 'Inception', 
      duration: '148 phút',
      image: 'https://example.com/inception.jpg',
    },
    { 
      id: 3, 
      title: 'Interstellar', 
      duration: '169 phút',
      image: 'https://example.com/interstellar.jpg',
    },
  ]);

  const [showAddSessionForm, setShowAddSessionForm] = useState(false);
  const [newSession, setNewSession] = useState({
    date: '',
    startTime: '',
    endTime: '',
    cinema: '',
  });

  const cinemas = ['Cineplex', 'Galaxy', 'BHD', 'Lotte Cinema']; // Danh sách các rạp

  const deleteFilm = (id) => {
    setFilms(films.filter((film) => film.id !== id));
  };

  const handleEditClick = (film) => {
    setSelectedFilm(film); // Lưu thông tin phim đang sửa
    setSelectedMenu('edit-film'); // Chuyển đến màn hình sửa phim
  };

  const handleAddSessionClick = (film) => {
    setShowAddSessionForm(true); // Hiện form thêm suất chiếu
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSession((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitSession = (e) => {
    e.preventDefault();
    console.log('Thông tin suất chiếu:', newSession);
    // Bạn có thể lưu thông tin suất chiếu vào cơ sở dữ liệu hoặc thực hiện các thao tác khác ở đây.
    alert('Suất chiếu đã được thêm!');
    setShowAddSessionForm(false); // Đóng form sau khi thêm suất chiếu
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
              <td className="border border-gray-300 px-4 py-2">{film.id}</td>
              <td className="border border-gray-300 px-4 py-2">{film.title}</td>
              <td className="border border-gray-300 px-4 py-2">{film.duration}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img 
                  src={film.image} 
                  alt={film.title} 
                  className="w-20 h-20 object-cover rounded" 
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                  onClick={() => deleteFilm(film.id)}
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
                  name="date"
                  value={newSession.date}
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
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Chọn rạp</option>
                  {cinemas.map((cinema, index) => (
                    <option key={index} value={cinema}>{cinema}</option>
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

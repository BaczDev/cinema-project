import React, { useState, useEffect } from 'react';

const EditFilm = ({ film, setSelectedMenu }) => {
  const [updatedFilm, setUpdatedFilm] = useState({
    title: '',
    duration: '',
    image: '',
    description: '',
    trailer: '',
    genre: '',
    releaseDate: '',
    language: '',
    director: '',
    cast: '',
    rated: ''
  });

  useEffect(() => {
    if (film) {
      setUpdatedFilm({
        title: film.title,
        duration: film.duration,
        image: film.image,
        description: film.description || '',
        trailer: film.trailer || '',
        genre: film.genre || '',
        releaseDate: film.releaseDate || '',
        language: film.language || '',
        director: film.director || '',
        cast: film.cast || '',
        rated: film.rated || ''
      });
    }
  }, [film]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFilm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateFilm = () => {
    // Cập nhật thông tin phim (giả sử bạn có hàm cập nhật)
    console.log('Phim đã sửa:', updatedFilm);
    alert('Phim đã được cập nhật');
    
    // Quay lại trang quản lý phim
    setSelectedMenu('film-manager');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sửa Phim</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label className="block font-medium">Tên Phim</label>
          <input
            type="text"
            name="title"
            value={updatedFilm.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Thời Lượng</label>
          <input
            type="text"
            name="duration"
            value={updatedFilm.duration}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Hình Ảnh URL</label>
          <input
            type="text"
            name="image"
            value={updatedFilm.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Mô Tả</label>
          <textarea
            name="description"
            value={updatedFilm.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Trailer URL</label>
          <input
            type="text"
            name="trailer"
            value={updatedFilm.trailer}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Thể Loại</label>
          <input
            type="text"
            name="genre"
            value={updatedFilm.genre}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Ngày Ra Mắt</label>
          <input
            type="date"
            name="releaseDate"
            value={updatedFilm.releaseDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Ngôn Ngữ</label>
          <input
            type="text"
            name="language"
            value={updatedFilm.language}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Đạo Diễn</label>
          <input
            type="text"
            name="director"
            value={updatedFilm.director}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Diễn Viên</label>
          <input
            type="text"
            name="cast"
            value={updatedFilm.cast}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Rated</label>
          <input
            type="text"
            name="rated"
            value={updatedFilm.rated}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button
          type="button"
          onClick={handleUpdateFilm}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Lưu
        </button>
      </form>
    </div>
  );
};

export default EditFilm;

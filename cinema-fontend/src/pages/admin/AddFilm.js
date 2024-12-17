import React, { useState } from 'react';

const AddFilm = () => {
  const [filmData, setFilmData] = useState({
    title: '',
    file: null,  // Dữ liệu tệp (ảnh hoặc video)
    duration: '',
    description: '',
    trailer: '',
    genre: '',
    releaseDate: '',
    language: '',
    director: '',
    actors: '',
    rated: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilmData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFilmData((prev) => ({
        ...prev,
        [name]: files[0], // Lưu tệp vào state
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Thêm phim mới:', filmData);

    // Xóa dữ liệu sau khi thêm phim
    setFilmData({
      title: '',
      file: null,  // Đặt lại tệp sau khi gửi
      duration: '',
      description: '',
      trailer: '',
      genre: '',
      releaseDate: '',
      language: '',
      director: '',
      actors: '',
      rated: '',
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Thêm Phim Mới</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block">Tên Phim</label>
          <input
            type="text"
            name="title"
            value={filmData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>
        <div>
          <label className="block">Ảnh/Video</label>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            accept="image/*,video/*" // Cho phép cả ảnh và video
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>
        <div>
          <label className="block">Thời Lượng</label>
          <input
            type="text"
            name="duration"
            value={filmData.duration}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>
        <div>
          <label className="block">Mô Tả</label>
          <textarea
            name="description"
            value={filmData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>
        <div>
          <label className="block">Trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={handleFileChange}
            accept="video/*" // Chỉ cho phép video cho trailer
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>
        <div>
          <label className="block">Thể Loại</label>
          <input
            type="text"
            name="genre"
            value={filmData.genre}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>
        <div>
          <label className="block">Ngày Ra Mắt</label>
          <input
            type="date"
            name="releaseDate"
            value={filmData.releaseDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>
        <div>
          <label className="block">Ngôn Ngữ</label>
          <input
            type="text"
            name="language"
            value={filmData.language}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>
        <div>
          <label className="block">Đạo Diễn</label>
          <input
            type="text"
            name="director"
            value={filmData.director}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>
        <div>
          <label className="block">Diễn Viên</label>
          <input
            type="text"
            name="actors"
            value={filmData.actors}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>
        <div>
          <label className="block">Rated</label>
          <input
            type="text"
            name="rated"
            value={filmData.rated}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>
        <button type="submit" className="w-full py-2 bg-green-500 text-white rounded mt-4">
          Thêm Phim
        </button>
      </form>
    </div>
  );
};

export default AddFilm;

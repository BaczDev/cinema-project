import React, { useState } from "react";
import { createMovie, uploadPoster } from "../../service/movieService";
import {
  createMovieDetail,
  uploadTrailer,
} from "../../service/movieDetailService";

const AddFilm = () => {
  const [filmData, setFilmData] = useState({
    movieName: "", // Tên phim
    moviePosterUrl: "", // Dữ liệu tệp (ảnh hoặc video poster)
    movieLength: "", // Thời lượng phim
    movieDescription: "", // Mô tả phim
    movieTrailer: "", // Tệp video trailer
    movieGenre: "", // Thể loại phim
    releaseDate: "", // Ngày ra mắt
    movieLanguage: "", // Ngôn ngữ phim
    director: "", // Đạo diễn
    cast: "", // Diễn viên
    rated: "", // Đánh giá phim
  });

  const token = localStorage.getItem("token");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gọi API createMovie
      const movieResponse = await createMovie(token,
        filmData.movieName,
        '',
        filmData.movieLength
      );

      // Sau khi tạo phim, upload poster
      const movieId = movieResponse.data.data.movieId;
      await uploadPoster(token, movieId, filmData.moviePosterUrl);

      // Gọi API createMovieDetail
      const movieDetailResponse = await createMovieDetail(token,
        filmData.movieDescription,
        '',
        filmData.movieGenre,
        filmData.releaseDate,
        filmData.movieLanguage,
        movieId,
        filmData.director,
        filmData.cast,
        filmData.rated
      );

      // Sau khi tạo movieDetail, upload trailer
      const movieDetailId = movieDetailResponse.data.data.movieDetailId;
      await uploadTrailer(token, movieDetailId, filmData.movieTrailer);

      alert("Phim đã được thêm thành công!");
      setFilmData({
        movieName: "",
        moviePoster: null,
        movieLength: "",
        movieDescription: "",
        movieTrailer: null,
        movieGenre: "",
        releaseDate: "",
        movieLanguage: "",
        director: "",
        cast: "",
        rated: "",
      });
    } catch (error) {
      console.error("Đã xảy ra lỗi khi thêm phim:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Thêm Phim Mới</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Tên Phim */}
        <div>
          <label className="block">Tên Phim</label>
          <input
            type="text"
            name="movieName"
            value={filmData.movieName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>

        {/* Poster */}
        <div>
          <label className="block">Poster</label>
          <input
            type="file"
            name="moviePosterUrl"
            onChange={handleFileChange}
            accept="image/*" // Cho phép tải lên hình ảnh cho poster
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>

        {/* Thời Lượng */}
        <div>
          <label className="block">Thời Lượng</label>
          <input
            type="text"
            name="movieLength"
            value={filmData.movieLength}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>

        {/* Mô Tả */}
        <div>
          <label className="block">Mô Tả</label>
          <textarea
            name="movieDescription"
            value={filmData.movieDescription}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>

        {/* Trailer */}
        <div>
          <label className="block">Trailer</label>
          <input
            type="file"
            name="movieTrailer"
            onChange={handleFileChange}
            accept="video/*" // Chỉ cho phép tải lên video cho trailer
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>

        {/* Thể Loại */}
        <div>
          <label className="block">Thể Loại</label>
          <input
            type="text"
            name="movieGenre"
            value={filmData.movieGenre}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>

        {/* Ngày Ra Mắt */}
        <div>
          <label className="block">Ngày Ra Mắt</label>
          <input
            type="date"
            name="releaseDate"
            value={filmData.releaseDate} // Đảm bảo giá trị releaseDate là chuỗi "yyyy-mm-dd"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>

        {/* Ngôn Ngữ */}
        <div>
          <label className="block">Ngôn Ngữ</label>
          <input
            type="text"
            name="movieLanguage"
            value={filmData.movieLanguage}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>

        {/* Đạo Diễn */}
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

        {/* Diễn Viên */}
        <div>
          <label className="block">Diễn Viên</label>
          <input
            type="text"
            name="cast"
            value={filmData.cast}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-sm"
          />
        </div>

        {/* Rated */}
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

        {/* Nút Lưu */}
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white rounded mt-4"
        >
          Thêm Phim
        </button>
      </form>
    </div>
  );
};

export default AddFilm;

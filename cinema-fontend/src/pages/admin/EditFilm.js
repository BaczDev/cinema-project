import React, { useState, useEffect } from "react";
import { updateMovie, uploadPoster } from "../../service/movieService";
import {
  getMovieDetailWithMovieId,
  updateMovieDetail,
  uploadTrailer,
} from "../../service/movieDetailService";
const EditFilm = ({ film, setSelectedMenu }) => {
  const [updatedFilm, setUpdatedFilm] = useState({
    movieName: "",
    movieLength: "",
    moviePosterUrl: null, // File hình ảnh
    movieDescription: "",
    movieTrailer: null, // File video trailer
    movieGenre: "",
    releaseDate: "",
    movieLanguage: "",
    director: "",
    cast: "",
    rated: "",
  });
  const [movieDetailId, setMovieDetailId] = useState(null);
  useEffect(() => {
    if (film) {
      setUpdatedFilm({
        movieName: film.movieName,
        movieLength: film.movieLength,
        moviePosterUrl: film.moviePosterUrl || "", // Đặt giá trị ảnh nếu có
        movieDescription: film.movieDescription || "",
        movieTrailer: film.movieTrailer || "",
        movieGenre: film.movieGenre || "",
        releaseDate: film.releaseDate || "",
        movieLanguage: film.movieLanguage || "",
        director: film.director || "",
        cast: film.cast || "",
        rated: film.rated || "",
      });
    }
    fetchMovieDetail();
  }, [film]);
  const fetchMovieDetail = async () => {
    try {
      const res = await getMovieDetailWithMovieId(film.movieId);
      setMovieDetailId(res.data.data.movieDetailId);
      if (res.data && res.data.data) {
        const movieDetail = res.data.data;
        setUpdatedFilm((prev) => ({
          ...prev,
          movieDescription: movieDetail.movieDescription,
          movieGenre: movieDetail.movieGenre,
          movieTrailer: movieDetail.movieTrailer,
          releaseDate: movieDetail.releaseDate,
          movieLanguage: movieDetail.movieLanguage,
          director: movieDetail.director,
          cast: movieDetail.cast,
          rated: movieDetail.rated,
        }));
      }
    } catch (error) {
      console.log("Fetch movie detail error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFilm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setUpdatedFilm((prev) => ({ ...prev, [name]: files[0] }));
    }
  };
  const token = localStorage.getItem("token");
  const handleUpdateFilm = async () => {
    try {
      const { moviePosterUrl, movieTrailer, movieName, movieLength, ...movieDetail } = updatedFilm;
      // 1. Cập nhật tên phim và thời lượng qua API updateMovie
      if (updatedFilm.movieName !== film.movieName || updatedFilm.movieLength !== film.movieLength) {
        await updateMovie(token, film.movieId, updatedFilm.movieName, updatedFilm.movieLength);
        alert('Tên phim và thời lượng đã được cập nhật.');
      }
  
      // 2. Nếu có file poster mới, gọi API uploadPoster
      if (moviePosterUrl instanceof File) {
        await uploadPoster(token, film.movieId, moviePosterUrl);
        console.log('Poster mới đã được tải lên.');
      }
  
      // 3. Cập nhật thông tin chi tiết phim qua API updateMovieDetail
      const fieldsToUpdate = [
        'movieDescription',
        'movieGenre',
        'releaseDate',
        'movieLanguage',
        'director',
        'cast',
        'rated',
      ];
      const hasDetailsChanged = fieldsToUpdate.some(
        (field) => updatedFilm[field] !== film[field]
      );
      if (hasDetailsChanged) {
        await updateMovieDetail(token, movieDetailId, film.movieId, 
                                updatedFilm.movieDescription, updatedFilm.movieGenre, 
                                updatedFilm.releaseDate, updatedFilm.movieLanguage,
                                updatedFilm.director, updatedFilm.cast, updatedFilm.rated
        );
        console.log('Thông tin chi tiết phim đã được cập nhật.');
      }
  
      // 4. Nếu có file trailer mới, gọi API uploadTrailer
      if (movieTrailer instanceof File) {
        await uploadTrailer(token, movieDetailId, movieTrailer);
        console.log('Trailer mới đã được tải lên.');
      }
  
      alert('Phim đã được cập nhật thành công');
      setSelectedMenu('film-manager');
    } catch (error) {
      console.error('Lỗi khi cập nhật phim:', error);
      alert('Đã xảy ra lỗi khi cập nhật phim');
    }
  };
  

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sửa Phim</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Tên Phim */}
        <div className="mb-4">
          <label className="block font-medium">Tên Phim</label>
          <input
            type="text"
            name="movieName"
            value={updatedFilm.movieName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Thời Lượng */}
        <div className="mb-4">
          <label className="block font-medium">Thời Lượng</label>
          <input
            type="text"
            name="movieLength"
            value={updatedFilm.movieLength}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Ảnh */}
        <div className="mb-4">
          <label className="block font-medium">Hình Ảnh</label>
          <input
            type="file"
            name="moviePosterUrl"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {updatedFilm.moviePosterUrl &&
          updatedFilm.moviePosterUrl instanceof File ? (
            <img
              src={URL.createObjectURL(updatedFilm.moviePosterUrl)}
              alt="Current Poster"
              className="mt-2 w-full h-auto max-w-[200px] object-cover"
            />
          ) : (
            updatedFilm.moviePosterUrl && (
              <img
                src={updatedFilm.moviePosterUrl} // Giả sử ảnh là URL khi đã lưu
                alt="Current Poster"
                className="mt-2 w-full h-auto max-w-[200px] object-cover"
              />
            )
          )}
        </div>

        {/* Mô Tả */}
        <div className="mb-4">
          <label className="block font-medium">Mô Tả</label>
          <textarea
            name="movieDescription"
            value={updatedFilm.movieDescription}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Trailer */}
        <div className="mb-4">
          <label className="block font-medium">Trailer</label>
          <input
            type="file"
            name="movieTrailer"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {updatedFilm.movieTrailer &&
          updatedFilm.movieTrailer instanceof File ? (
            <video
              controls
              src={URL.createObjectURL(updatedFilm.movieTrailer)}
              className="mt-2 w-full h-auto max-w-[400px] object-cover"
            >
              Trình duyệt của bạn không hỗ trợ trình phát video.
            </video>
          ) : (
            updatedFilm.movieTrailer && (
              <video
                controls
                src={updatedFilm.movieTrailer} // Giả sử trailer là URL khi đã lưu
                className="mt-2 w-full h-auto max-w-[400px] object-cover"
              >
                Trình duyệt của bạn không hỗ trợ trình phát video.
              </video>
            )
          )}
        </div>

        {/* Thể Loại */}
        <div className="mb-4">
          <label className="block font-medium">Thể Loại</label>
          <input
            type="text"
            name="movieGenre"
            value={updatedFilm.movieGenre}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Ngày Ra Mắt */}
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

        {/* Ngôn Ngữ */}
        <div className="mb-4">
          <label className="block font-medium">Ngôn Ngữ</label>
          <input
            type="text"
            name="movieLanguage"
            value={updatedFilm.movieLanguage}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Đạo Diễn */}
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

        {/* Diễn Viên */}
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

        {/* Rated */}
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

        {/* Nút Lưu */}
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

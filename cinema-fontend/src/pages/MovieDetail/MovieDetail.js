import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getMovie } from "../../service/movieService";
import { getMovieDetailWithMovieId } from "../../service/movieDetailService";

const MovieDetail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const movieId = queryParams.get("movieId");
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [movieDetail, setMovieDetail] = useState(null);
  const [loadingMovie, setLoadingMovie] = useState(true);
  const [loadingMovieDetail, setLoadingMovieDetail] = useState(true);
  const [errorMovie, setErrorMovie] = useState(null);
  const [errorMovieDetail, setErrorMovieDetail] = useState(null);
  useEffect(() => {
    fetchMovie(movieId);
    fetchMovieDetail(movieId);
  }, []);

  const fetchMovie = async (movieId) => {
    try {
      const res = await getMovie(movieId);
      setMovie(res.data.data);
    } catch (err) {
      setErrorMovie("Không thể tải thông tin phim. Vui lòng thử lại sau.");
    } finally {
      setLoadingMovie(false);
    }
  };
  const fetchMovieDetail = async (movieId) => {
    try {
      const res = await getMovieDetailWithMovieId(movieId);
      setMovieDetail(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      setErrorMovieDetail("Không thể tải thông tin chi tiết phim.");
    } finally {
      setLoadingMovieDetail(false);
    }
  };

  // Hiển thị trạng thái "Đang tải..."
  if (loadingMovie || loadingMovieDetail) {
    return (
      <div className="p-6 text-center text-xl">Đang tải thông tin phim...</div>
    );
  }

  // Hiển thị trạng thái lỗi nếu có
  if (errorMovie || errorMovieDetail) {
    return (
      <div className="p-6 text-center text-xl text-red-500">
        {errorMovie || errorMovieDetail}
      </div>
    );
  }

  // Hiển thị thông báo nếu không tìm thấy phim
  if (!movie) {
    return <div className="p-6 text-center text-xl">Không tìm thấy phim</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow max-w-4xl mx-auto p-2">
        <h2 className="text-3xl font-bold mb-6 text-center">Chi Tiết Phim</h2>

        {/* Main Section */}
        <div className="flex flex-col md:flex-row items-start gap-10">
          {/* Hình ảnh phim và nút mua vé */}
          <div className="w-full md:w-1/3">
            <img
              src={movie.moviePosterUrl}
              alt={movie.title}
              className="w-full h-auto rounded-md shadow-lg"
            />
            <button
              onClick={() => navigate(`/cinema?movieId=${movie.movieId}`)}
              className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Mua vé
            </button>
          </div>

          {/* Thông tin chi tiết */}
          <div className="w-full md:w-2/3">
            <ul className="space-y-2 text-lg">
              <li>
                <strong>Tên Phim:</strong> {movie.movieName}
              </li>
              <li>
                <strong>Đạo diễn:</strong> {movieDetail.director}
              </li>
              <li>
                <strong>Diễn Viên:</strong> {movieDetail.cast}
              </li>
              <li>
                <strong>Ngày Khởi Chiếu:</strong> {movieDetail.releaseDate}
              </li>
              <li>
                <strong>Thể Loại:</strong> {movieDetail.movieGenre}
              </li>
              <li>
                <strong>Thời Lượng:</strong> {movie.movieLength}
              </li>
              <li>
                <strong>Ngôn Ngữ:</strong> {movieDetail.movieLanguage}
              </li>
              <li>
                <strong>Rated:</strong> {movieDetail.rated}
              </li>
            </ul>
          </div>
        </div>

        {/* Trailer và Giới thiệu nằm ngang */}
        <div className="mt-8 flex flex-col md:flex-row gap-8">
          {/* Trailer */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Trailer:</h3>
            <div className="w-full aspect-video">
              <div className="w-full aspect-video">
                {movieDetail.movieTrailer ? (
                  <video className="w-full h-full rounded-md" controls>
                    <source src={movieDetail.movieTrailer} type="video/mp4" />
                    Trình duyệt của bạn không hỗ trợ video.
                  </video>
                ) : (
                  <p className="text-gray-500">Trailer không khả dụng</p>
                )}
              </div>
            </div>
          </div>

          {/* Giới thiệu */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Giới Thiệu:</h3>
            <p className="text-lg leading-relaxed">
              {movieDetail.movieDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

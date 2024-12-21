import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const MovieDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();
  const movies = {
    1: {
      title: 'Người Nhện: Không Còn Nhà',
      director: 'Jon Watts',
      cast: 'Tom Holland, Zendaya, Benedict Cumberbatch, Jacob Batalon, Jon Favreau',
      releaseDate: '2021-12-17',
      genre: 'Hành Động, Phiêu Lưu',
      duration: '149 phút',
      language: 'Tiếng Anh - Phụ đề Tiếng Việt',
      rated: 'C13 - PHIM CẤM KHÁN GIẢ DƯỚI 13 TUỔI',
      description: 'Lần đầu tiên trong lịch sử điện ảnh của Người Nhện...',
      imageUrl: 'https://cdn.marvel.com/content/1x/deadpoolandwolverine_lob_crd_03.jpg',
      trailerUrl: 'https://www.youtube.com/embed/JfVOs4VSpmA',
    },
    2: {
      title: 'Movie 2',
      description: 'Detailed description of Movie 2',
      imageUrl: 'https://via.placeholder.com/300x200?text=Movie+2',
      trailerUrl: '',
    },
  };

  const movie = movies[id];

  if (!movie) {
    return <div className="p-6 text-center text-xl">Movie not found</div>;
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
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-auto rounded-md shadow-lg"
            />
            <button
              onClick={() => navigate(`/cinema/${movie.id}`)}
              className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Mua vé
            </button>
          </div>

          {/* Thông tin chi tiết */}
          <div className="w-full md:w-2/3">
            <ul className="space-y-2 text-lg">
              <li>
                <strong>Tên Phim:</strong> {movie.title}
              </li>
              <li>
                <strong>Đạo diễn:</strong> {movie.director}
              </li>
              <li>
                <strong>Diễn Viên:</strong> {movie.cast}
              </li>
              <li>
                <strong>Ngày Khởi Chiếu:</strong> {movie.releaseDate}
              </li>
              <li>
                <strong>Thể Loại:</strong> {movie.genre}
              </li>
              <li>
                <strong>Thời Lượng:</strong> {movie.duration}
              </li>
              <li>
                <strong>Ngôn Ngữ:</strong> {movie.language}
              </li>
              <li>
                <strong>Rated:</strong> {movie.rated}
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
            <iframe
              className="w-full h-full rounded-md"
              src={movie.trailerUrl}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Giới thiệu */}
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-semibold mb-4">Giới Thiệu:</h3>
          <p className="text-lg leading-relaxed">{movie.description}</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MovieDetail;

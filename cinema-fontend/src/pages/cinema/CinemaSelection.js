import React from 'react';
import { Link } from 'react-router-dom';
const cinemas = [
  {
    id: 1,
    name: 'HUYCINEMA Hà Đông',
    address: 'Tầng 4, Mê Linh Plaza Hà Đông, Đ. Tô Hiệu, P. Hà Đông, Hà Nội',
    phone: '0938473829',
    map: 'https://via.placeholder.com/300x200', // URL bản đồ thay thế
  },
  {
    id: 2,
    name: 'HUYCINEMA Thủ Đức',
    address: '216 Đ. Võ Văn Ngân, Bình Thọ, Thủ Đức, Thành phố Hồ Chí Minh',
    phone: '1900 6017',
    map: 'https://via.placeholder.com/300x200', // URL bản đồ thay thế
  },
];

const CinemaSelection = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Chọn Rạp Chiếu
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cinemas.map((cinema) => (
          <div
            key={cinema.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            {/* Map Image */}
            <img
              src={cinema.map}
              alt={`Bản đồ của ${cinema.name}`}
              className="w-full h-48 object-cover"
            />
            {/* Cinema Info */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {cinema.name}
              </h2>
              <p className="text-gray-600">{cinema.address}</p>
              <Link to={`/booking/${cinema.id}`}  
                    className="mt-4 block w-full py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded text-center transition duration-300">
                Chọn
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CinemaSelection;

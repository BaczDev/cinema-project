import React, { useState } from 'react';
import FilmManager from './FilmManager';
import UserManager from './UserManager';
import AddFilm from './AddFilm';
import EditFilm from './EditFilm';

const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState('film-manager');
  const [selectedFilm, setSelectedFilm] = useState(null); // Trạng thái phim đang sửa

  const renderContent = () => {
    switch (selectedMenu) {
      case 'film-manager':
        return <FilmManager setSelectedFilm={setSelectedFilm} setSelectedMenu={setSelectedMenu} />;
      case 'user-manager':
        return <UserManager />;
      case 'add-film':
        return <AddFilm />;
      case 'edit-film':
        return selectedFilm ? <EditFilm film={selectedFilm} setSelectedMenu={setSelectedMenu} /> : <div>Vui lòng chọn phim để sửa.</div>;
      default:
        return <div>Chọn một chức năng từ menu bên trái</div>;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Menu bên trái */}
      <div className="w-1/5 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Menu</h1>
        <ul>
          <li
            className={`cursor-pointer py-2 px-4 ${selectedMenu === 'film-manager' ? 'bg-gray-600' : ''}`}
            onClick={() => setSelectedMenu('film-manager')}
          >
            Quản lý Phim
          </li>
          <ul className="pl-4">
            <li
              className={`cursor-pointer py-2 px-4 ${selectedMenu === 'add-film' ? 'bg-gray-600' : ''}`}
              onClick={() => setSelectedMenu('add-film')}
            >
              Thêm Phim
            </li>
          </ul>
          <li
            className={`cursor-pointer py-2 px-4 ${selectedMenu === 'user-manager' ? 'bg-gray-600' : ''}`}
            onClick={() => setSelectedMenu('user-manager')}
          >
            Quản lý Người Dùng
          </li>
        </ul>
      </div>

      {/* Nội dung bên phải */}
      <div className="w-4/5 p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;

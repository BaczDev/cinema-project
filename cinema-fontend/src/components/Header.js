import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Thêm useLocation
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

const Header = () => {
  const { isLoggedIn, logout } = useAuth(); // Lấy trạng thái đăng nhập và hàm logout từ context
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State điều khiển mở/đóng menu
  const menuRef = useRef(null); // Reference để kiểm tra click ngoài menu
  const avatarRef = useRef(null); // Reference để kiểm tra click ngoài avatar
  const navigate = useNavigate(); // Hook để điều hướng
  const location = useLocation(); // Hook để lấy thông tin URL hiện tại

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Hàm toggle menu

  const handleLogout = () => {
    logout(); // Gọi hàm logout từ AuthContext
    navigate('/'); // Chuyển hướng về trang Home
    setIsMenuOpen(false); // Đóng menu khi logout
  };

  const handleProfileClick = () => {
    setIsMenuOpen(false); // Đóng menu khi người dùng click vào thông tin cá nhân
  };

  // Thêm event listener để đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Ẩn menu khi chuyển sang trang đăng ký, đăng nhập, hoặc trang cá nhân
  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/profile') {
      setIsMenuOpen(false); // Đóng menu nếu đang ở trang đăng ký, đăng nhập hoặc cá nhân
    }
  }, [location]); // Mỗi khi URL thay đổi, kiểm tra

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link to="/" className="text-xl font-bold">
        Bacz Cinema
      </Link>

      {/* Menu trên màn hình lớn */}
      <div className="hidden md:flex space-x-4">
        {!isLoggedIn ? (
          <>
            <Link to="/register" className="px-4 py-2 bg-blue-500 rounded">
              Đăng Ký
            </Link>
            <Link to="/login" className="px-4 py-2 bg-blue-500 rounded">
              Đăng Nhập
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-4 relative">
            <div
              ref={avatarRef}
              onClick={toggleMenu}
              className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white cursor-pointer"
            >
              A {/* Avatar giả lập */}
            </div>
            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute right-0 top-12 bg-gray-800 text-white shadow-lg rounded-md w-48 py-2 px-4"
              >
                <Link
                  to="/profile"
                  onClick={handleProfileClick} // Gọi hàm đóng menu khi click vào trang cá nhân
                  className="block px-4 py-2 hover:bg-gray-700 rounded-md"
                >
                  Thông tin cá nhân
                </Link>
                <span
                  onClick={handleLogout} // Gọi hàm handleLogout khi click
                  className="block px-4 py-2 hover:bg-gray-700 rounded-md cursor-pointer"
                >
                  Đăng Xuất
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Menu di động với hamburger */}
      <div className="md:hidden flex items-center">
        {!isLoggedIn ? (
          <button
            onClick={toggleMenu}
            className="text-white text-3xl focus:outline-none"
          >
            &#9776; {/* Hamburger icon */}
          </button>
        ) : (
          <div
            ref={avatarRef}
            onClick={toggleMenu}
            className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white cursor-pointer ml-4"
          >
            A {/* Avatar giả lập */}
          </div>
        )}

        {/* Menu */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-12 right-0 bg-gray-800 text-white shadow-lg rounded-md w-48 py-2 px-4"
          >
            {!isLoggedIn ? (
              <>
                <Link
                  to="/register"
                  className="block px-4 py-2 hover:bg-gray-700 rounded-md"
                >
                  Đăng Ký
                </Link>
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-gray-700 rounded-md"
                >
                  Đăng Nhập
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  onClick={handleProfileClick} // Gọi hàm đóng menu khi click vào trang cá nhân
                  className="block px-4 py-2 hover:bg-gray-700 rounded-md"
                >
                  Thông tin cá nhân
                </Link>
                <span
                  onClick={handleLogout} // Gọi hàm handleLogout khi click
                  className="block px-4 py-2 hover:bg-gray-700 rounded-md cursor-pointer"
                >
                  Đăng Xuất
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

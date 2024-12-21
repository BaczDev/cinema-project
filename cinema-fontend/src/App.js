import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import BookingPage from './pages/booking/BookingPage';
import SeatSelectionPage from './pages/seat/SeatSelectionPage';
import PaymentHistoryPage from './pages/PaymentHistory/PaymentHistoryPage';
import Profile from './pages/profile/Profile';
import Dashboard from './pages/admin/Dashboard'; // Import Dashboard
import CinemaSelection from './pages/cinema/CinemaSelection';

// Component Layout: Render Header/Footer dựa vào điều kiện
const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname.startsWith('/admin'); // Kiểm tra nếu là trang Admin

  return (
    <>
      {!hideHeaderFooter && <Header />} {/* Ẩn Header trên trang Admin */}
      <div>{children}</div>
      {!hideHeaderFooter && <Footer />} {/* Ẩn Footer trên trang Admin */}
    </>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  
  return (
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/cinema/:movieId" element={<CinemaSelection />} />
            <Route path="/booking/:movieId/seat/:showtimeId" element={<SeatSelectionPage />} />
            <Route path="/payment-history" element={<PaymentHistoryPage />} />
            <Route path="/profile" element={<Profile />} />

            {/* Route trang Admin */}
            <Route path="/admin" element={<Dashboard />} />
          </Routes>
        </Layout>
      </Router>
  );
};

export default App;

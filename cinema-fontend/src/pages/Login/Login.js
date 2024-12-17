// src/components/Login.js
import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook

export default function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Lấy hàm login từ context

  // Dữ liệu giả lập để test đăng nhập
  const fakeUser = {
    userName: 'testUser',
    password: '123456',
  };

  // Hàm xử lý khi người dùng submit form
  const onFinish = (values) => {
    const { userName, password } = values;

    // Kiểm tra thông tin người dùng nhập
    if (userName === fakeUser.userName && password === fakeUser.password) {
      setErrorMessage('');
      login(); // Đăng nhập thành công
      navigate('/'); // Điều hướng về trang chính sau khi đăng nhập
    } else {
      setErrorMessage('Tên đăng nhập hoặc mật khẩu không chính xác!');
    }
  };

  return (
    <div 
      className="h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: 'url(https://preview.redd.it/best-movie-of-2022-v0-qdocrx5vzlea1.jpg?auto=webp&s=7b93c6b2013dcae753493aeb718d0517eca5f777)' }} 
    >
      <div className="py-8 px-8 bg-white rounded-2xl shadow-xl z-20 w-full max-w-xs sm:max-w-lg md:max-w-lg lg:max-w-xl">
        <Form
          name="basic"
          className="d-flex flex-col"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 350, width: '100%', minWidth: '100%' }}
          initialValues={{ remember: false }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <div>
            <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Đăng Nhập</h1>
            <p className="text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide">Đăng nhập để truy cập vào tài khoản của bạn</p>
          </div>

          <Form.Item
            label=""
            name="userName"
            style={{ minWidth: '100%' }}
            rules={[
              { required: true, message: 'Tên đăng nhập không được để trống!', transform: (value) => value.trim() },
            ]}
          >
            <Input className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" placeholder="Tên đăng nhập" />
          </Form.Item>

          <Form.Item
            label=""
            name="password"
            rules={[
              { required: true, message: 'Password không được để trống!', transform: (value) => value.trim() },
            ]}
          >
            <Input.Password className="d-flex block text-sm py-3 px-4 mt-3 rounded-lg w-full border outline-none" placeholder="Mật khẩu" />
          </Form.Item>

          {errorMessage && (
            <div className="text-red-500 text-center mb-4">
              {errorMessage}
            </div>
          )}

          <div className="text-center mt-6">
            {/* Sử dụng Link thay vì button để điều hướng */}
            <button type="submit" className="py-3 px-8 text-2xl text-white bg-purple-400 rounded-xl">
              Đăng nhập
            </button>
            <p className="mt-4 text-sm">Bạn chưa có tài khoản? <a href="register" className="underline cursor-pointer"> Đăng ký</a></p>
          </div>
        </Form>
      </div>
    </div>
  );
}

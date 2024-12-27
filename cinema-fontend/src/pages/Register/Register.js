import React, { useState } from 'react';
import {  Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { register } from '../../service/userService';

export default function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  const handleRegister = async () => {
    try {
      let res = await register(userName, password, email, phoneNumber);
      if(res.status === 200){
        alert("Đăng ký thành công!");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      alert("Đăng ký thất bại, tên đăng nhập đã tồn tại!");
    }
  }
  
  const getValueUsername = (value) => {
    setUserName(value);
  }

  const getValuePassword = (value) => {
    setPassword(value);
  }

  const getValueEmail = (value) => {
    setEmail(value);
  }

  const getValuePhoneNumber = (value) => {
    setPhoneNumber(value);
  }

  return (
    <div 
      className="h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: 'url(https://preview.redd.it/best-movie-of-2022-v0-qdocrx5vzlea1.jpg?auto=webp&s=7b93c6b2013dcae753493aeb718d0517eca5f777)' }} // Thay đường dẫn ảnh background
    >
      <div className="py-8 px-8 bg-white rounded-2xl shadow-xl z-20 w-full max-w-xs sm:max-w-lg md:max-w-lg lg:max-w-xl"> {/* Căn giữa và giới hạn kích thước của form */}
        <Form
          name="basic"
          className='d-flex flex-col'
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 350,
            width: '100%',
            minWidth: '100%',
          }}
          initialValues={{
            remember: false,
          }}

          autoComplete="off"
        >
          <div>
            <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Đăng ký</h1>
            <p className="text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide">Đăng ký để trải nghiệm những tính năng hấp dẫn</p>
          </div>

          <Form.Item
            label=""
            name="userName"
            rules={[
              {
                required: true,
                message: 'Tên đăng nhập không được để trống!',
                transform: (value) => value.trim(),
              },
              {
                min: 5, 
                message: 'Tên đăng nhập phải có ít nhất 5 ký tự!',
              }
            ]}
          >
            <Input className="d-flex block text-sm py-3 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Tên đăng nhập" onChange={(e) => getValueUsername(e.target.value)} />
          </Form.Item>

          <Form.Item
            label=""
            name="password"
            rules={[
              {
                required: true,
                message: 'Password không được để trống!',
                transform: (value) => value.trim(),
              },
              {
                min: 6,
                message: 'mật khẩu phải có ít nhất 6 kí tự!',
              }
            ]}
          >
            <Input.Password className="d-flex block text-sm py-3 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Mật khẩu" onChange={(e) => getValuePassword(e.target.value)} />
          </Form.Item>

          <Form.Item
            name="email"
            label=""
            rules={[
              {
                type: 'email',
                message: 'E-mail chưa đúng định dạng!',
              },
              {
                required: true,
                message: 'E-mail không được để trống!',
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Input className="d-flex block text-sm py-3 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Email" onChange={(e) => getValueEmail(e.target.value)}/>
          </Form.Item>

          <Form.Item
            label=""
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: 'Số điện thoại không được để trống!',
              },{
                min: 10,
                message: 'Số điện thoại phải có 10 số!'
              }
            ]}
          >
            <Input className="d-flex block text-sm py-3 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Số điện thoại" onChange={(e) => getValuePhoneNumber(e.target.value)}/>
          </Form.Item>

          <Form.Item
            name="remember"
            style={{ textAlign: 'left' }}
            valuePropName="checked"
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
          >
            {/* <Checkbox >Ghi nhớ</Checkbox> */}
          </Form.Item>

          <div className="text-center mt-6">
            <button type="submit" className="py-2 w-64 text-xl text-white bg-purple-400 rounded-xl"
             onClick={() => handleRegister()}>Đăng ký</button>
            <p className="mt-4 text-sm">Bạn đã có tài khoản? <a href='login' className="underline  cursor-pointer"> Đăng nhập</a></p>
          </div>
        </Form>
      </div>
    </div>
  )
}

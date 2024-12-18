import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
//import { useDispatch, useSelector } from 'react-redux';

export default function Register(props) {

  //   const dispatch = useDispatch();
  //   const { userLogin } = useSelector(state => state.UserReducer)

  //   const onFinish = (values) => {
  //     const action = dangKyAction(values);
  //     dispatch(action)
  //   };
  //   const onFinishFailed = (errorInfo) => {
  //     console.log('Failed:', errorInfo);
  //   };

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
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
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
            ]}
          >
            <Input className="d-flex block text-sm py-3 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Tên đăng nhập" />
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
            ]}
          >
            <Input.Password className="d-flex block text-sm py-3 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Mật khẩu" />
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
            <Input className="d-flex block text-sm py-3 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Email" />
          </Form.Item>

          <Form.Item
            label=""
            name="soDt"
            rules={[
              {
                required: true,
                message: 'Số điện thoại không được để trống!',
              },
            ]}
          >
            <Input className="d-flex block text-sm py-3 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Số điện thoại" />
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
            <button type="submit" className="py-2 w-64 text-xl text-white bg-purple-400 rounded-xl">Đăng ký</button>
            <p className="mt-4 text-sm">Bạn đã có tài khoản? <a href='login' className="underline  cursor-pointer"> Đăng nhập</a></p>
          </div>
        </Form>
      </div>
    </div>
  )
}

import React, { useState, useEffect } from "react";
import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../service/authService";

export default function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Giải mã phần payload
      const expirationTime = payload.exp ? new Date(payload.exp * 1000) : null; // Lấy thời gian hết hạn
      const role = payload.scope; // Lấy quyền, mặc định là "user" nếu không có trong payload
      return { expirationTime, role };
    } catch (error) {
      console.error("Lỗi khi giải mã token:", error);
      return null;
    }
  };

  const handleLogin = async () => {
    try {
      let response = await loginApi(userName, password);

      if (response.data && response.data.data.token) {
        const token = response.data.data.token; // Lấy token từ phản hồi
        const { expirationTime, role } = decodeToken(token);

        localStorage.setItem("token", token);

        if (expirationTime) {
          // Lưu thời gian hết hạn vào localStorage
          localStorage.setItem("tokenExpiresAt", expirationTime.getTime());
        }

        if (role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        console.log("Token không tồn tại trong phản hồi");
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      alert("Đăng nhập thất bại, tài khoản hoặc mật khẩu không đúng!");
    }
  };

  const getValueUsername = (value) => {
    setUserName(value);
  };

  const getValuePassword = (value) => {
    setPassword(value);
  };

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    const tokenExpiresAt = localStorage.getItem("tokenExpiresAt");

    if (token && tokenExpiresAt) {
      const currentTime = new Date().getTime();
      if (currentTime > tokenExpiresAt) {
        // Token đã hết hạn, xóa token và chuyển đến trang login
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiresAt");
        navigate("/login");
      }
    }
  };

  // Kiểm tra khi app khởi động lại
  useEffect(() => {
    checkTokenExpiration();
  }, []);

  return (
    <div
      className="h-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage:
          "url(https://preview.redd.it/best-movie-of-2022-v0-qdocrx5vzlea1.jpg?auto=webp&s=7b93c6b2013dcae753493aeb718d0517eca5f777)",
      }}
    >
      <div className="py-8 px-8 bg-white rounded-2xl shadow-xl z-20 w-full max-w-xs sm:max-w-lg md:max-w-lg lg:max-w-xl">
        <Form
          name="basic"
          className="d-flex flex-col"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 350, width: "100%", minWidth: "100%" }}
          initialValues={{ remember: false }}
          //onFinish={onFinish}
          autoComplete="off"
        >
          <div>
            <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
              Đăng Nhập
            </h1>
            <p className="text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide">
              Đăng nhập để truy cập vào tài khoản của bạn
            </p>
          </div>

          <Form.Item
            label=""
            name="userName"
            style={{ minWidth: "100%" }}
            rules={[
              {
                required: true,
                message: "Tên đăng nhập không được để trống!",
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Input
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              placeholder="Tên đăng nhập"
              onChange={(e) => getValueUsername(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label=""
            name="password"
            rules={[
              {
                required: true,
                message: "Password không được để trống!",
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Input.Password
              className="d-flex block text-sm py-3 px-4 mt-3 rounded-lg w-full border outline-none"
              placeholder="Mật khẩu"
              onChange={(e) => getValuePassword(e.target.value)}
            />
          </Form.Item>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="py-3 px-8 text-2xl text-white bg-purple-400 rounded-xl"
              onClick={() => handleLogin()}
            >
              Đăng nhập
            </button>
            <p className="mt-4 text-sm">
              Bạn chưa có tài khoản?{" "}
              <a href="register" className="underline cursor-pointer">
                {" "}
                Đăng ký
              </a>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

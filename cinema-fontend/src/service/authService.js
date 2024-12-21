import axios from "./CustomizeAxios";

const loginApi = (userName, password) => {
  return axios.post("/api/v1/auth/log-in", { userName, password });
};

const logoutApi = (token) => {
  return axios.post("/api/v1/auth/log-out", { token });
}



export { loginApi, logoutApi };

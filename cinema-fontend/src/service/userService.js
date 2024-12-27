import axios from './CustomizeAxios';

const getProfile = (token) => {
    return axios.get("/api/v1/users/myInfo", {
      headers: { Authorization: "Bearer " + token },
    });
  };

const register = (userName, password, email, phoneNumber) => {
  return axios.post("/api/v1/users/register", {userName, password, email, phoneNumber})
};

const getAllUsers = (token) => {
  return axios.get("/api/v1/users", {
    headers: { Authorization: "Bearer " + token },
  });
}

const deleteUser = (userId, token) => {
  return axios.delete(`/api/v1/users/delete/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

const updateByAdmin = (userId, updatedData, token) => {
  return axios.put(`/api/v1/users/update-by-admin/${userId}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
const updateByUser = (token, userId, password, email, phoneNumber) => {
  return axios.put(
    `/api/v1/users/update/${userId}`,
    { password, email, phoneNumber },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};


export {getProfile, register, getAllUsers, deleteUser, updateByAdmin, updateByUser};
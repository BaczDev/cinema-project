import axios from "./CustomizeAxios";

const getRooms = (token, cinemaId) => {
    return axios.get(`/api/v1/room/cinema/${cinemaId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

const getRoomWithId = (token, roomId) => {
    return axios.get(`/api/v1/room/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

const createRoom = (token, roomName, cinemaId) => {
    return axios.post(`/api/v1/room/create`, { roomName, cinemaId }, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export { getRooms, createRoom, getRoomWithId };
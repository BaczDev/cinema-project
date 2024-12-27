import axios from "./CustomizeAxios";

const getSeatWithRoomId = (token, roomId) => {
    return axios.get(`/api/v1/seat/room/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export { getSeatWithRoomId};
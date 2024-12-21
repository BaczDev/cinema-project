import axios from "./CustomizeAxios";

const getCinemas = () => {
    return axios.get("/api/v1/cinema");
}

const createCinema = (token, newCinema) => {
    return axios.post("/api/v1/cinema/create", newCinema, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

const updateCinema = (token, cinemaId, editCinema) => {
    return axios.put(`/api/v1/cinema/update/${cinemaId}`, editCinema, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

const deleteCinema = (token, cinemaId) => {
    return axios.delete(`/api/v1/cinema/delete/${cinemaId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

//room
const getRooms = (token, cinemaId) => {
    return axios.get(`/api/v1/room/cinema/${cinemaId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

const createRoom = (token, roomName, cinemaId) => {
    return axios.post(`/api/v1/room/create`, { roomName, cinemaId }, {
        headers: { Authorization: `Bearer ${token}` },
    });
}
 
export { getCinemas, createCinema, updateCinema, deleteCinema, getRooms, createRoom };
import axios from "./CustomizeAxios";

const getCinemas = () => {
    return axios.get("/api/v1/cinema");
}

const getCinemaWithId = (cinemaId) => {
    return axios.get(`/api/v1/cinema/${cinemaId}`);
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


 
export { getCinemas, createCinema, updateCinema, deleteCinema, getCinemaWithId };
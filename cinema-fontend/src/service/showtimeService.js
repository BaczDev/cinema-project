import axios from './CustomizeAxios';

const addShowtime = (token, showDate, startTime, endTime, movieId, cinemaId, roomId) => {
    return axios.post(`/api/v1/showtime/create`, {
        showDate: showDate,
        startTime: startTime,
        endTime: endTime,
        movieId: movieId,
        cinemaId: cinemaId,
        roomId: roomId
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const getShowtimeByCinemaAndMovie = (cinemaId, movieId) => {
    return axios.get(`/api/v1/showtime/byCinemaAndMovie?cinemaId=${cinemaId}&movieId=${movieId}`);
}

const getShowtimeByCriteria = (cinemaId, movieId, showDate) => {
    return axios.get(`/api/v1/showtime?cinemaId=${cinemaId}&movieId=${movieId}&showDate=${showDate}`);
}

export { addShowtime, getShowtimeByCinemaAndMovie, getShowtimeByCriteria };
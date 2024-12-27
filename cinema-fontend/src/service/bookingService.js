import axios from "./CustomizeAxios";

const createBooking = (
  token,
  userId,
  cinemaId,
  movieId,
  seatId,
  showtimeId
) => {
  return axios.post(
    `/api/v1/booking/create`,
    {
      userId,
      cinemaId,
      movieId,
      seatId,
      showtimeId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

const getBookingHistory = (token, userId) => {
  return axios.get(`/api/v1/booking/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getAllBooking = () => {
  return axios.get(`/api/v1/booking`);
}

export { createBooking, getBookingHistory, getAllBooking };

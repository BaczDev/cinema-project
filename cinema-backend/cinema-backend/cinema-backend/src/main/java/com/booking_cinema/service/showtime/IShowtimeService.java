package com.booking_cinema.service.showtime;

import com.booking_cinema.dto.request.showtime.ShowtimeRequest;
import com.booking_cinema.dto.response.showtime.ShowtimeResponse;

import java.util.List;

public interface IShowtimeService {
    List<ShowtimeResponse> getShowtimeWithMovieId(Long movieId);
    List<ShowtimeResponse> getShowtimeWithCinemaId(Long cinemaId);
    ShowtimeResponse createShowtime(ShowtimeRequest request);
    ShowtimeResponse updateShowtime(Long showtimeId, ShowtimeRequest request);
    void deleteShowtime(Long showtimeId);
}

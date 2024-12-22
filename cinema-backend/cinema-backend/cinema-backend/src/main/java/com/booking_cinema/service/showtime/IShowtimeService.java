package com.booking_cinema.service.showtime;

import com.booking_cinema.dto.request.showtime.ShowtimeRequest;
import com.booking_cinema.dto.response.showtime.ShowtimeResponse;

import java.time.LocalDate;
import java.util.List;

public interface IShowtimeService {
    List<ShowtimeResponse> getShowtimeWithMovieId(Long movieId);
    List<ShowtimeResponse> getShowtimeWithCinemaId(Long cinemaId);
    ShowtimeResponse createShowtime(ShowtimeRequest request);
    ShowtimeResponse updateShowtime(Long showtimeId, ShowtimeRequest request);
    void deleteShowtime(Long showtimeId);

    List<ShowtimeResponse> getShowtimeByCriteria(Long cinemaId, Long movieId, LocalDate showDate);

    List<ShowtimeResponse> getShowtimeByCinemaAndMovie(Long cinemaId, Long movieId);
}

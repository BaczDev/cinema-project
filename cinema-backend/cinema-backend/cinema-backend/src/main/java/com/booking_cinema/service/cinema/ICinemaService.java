package com.booking_cinema.service.cinema;

import com.booking_cinema.dto.request.cinema.CinemaRequest;
import com.booking_cinema.dto.response.cinema.CinemaResponse;
import com.booking_cinema.model.Cinema;

import java.util.List;

public interface ICinemaService {
    CinemaResponse getCinema(Long cinemaId);
    List<CinemaResponse> getAllCinemas();
    Cinema createCinema(CinemaRequest request);
    CinemaResponse updateCinema(Long cinemaId, CinemaRequest request);
    void deleteCinema(Long cinemaId);
}

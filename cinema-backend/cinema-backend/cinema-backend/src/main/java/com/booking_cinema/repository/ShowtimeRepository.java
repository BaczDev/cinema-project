package com.booking_cinema.repository;

import com.booking_cinema.model.ShowTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ShowtimeRepository extends JpaRepository<ShowTime, Long> {
    List<ShowTime> findAllByCinemaId_CinemaId(Long cinemaId);
    List<ShowTime> findAllByMovieId_MovieId(Long movieId);

    boolean existsByShowDateAndCinemaId_CinemaIdAndMovieId_MovieId(LocalDate showDate, Long cinemaId, Long movieId);
}

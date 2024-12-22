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

    boolean existsByShowDateAndRoomId_RoomIdAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
        LocalDate showDate, Long roomId, String startTime, String endTime
    );

    List<ShowTime> findByCinemaId_CinemaIdAndMovieId_MovieIdAndShowDate(Long cinemaId, Long movieId, LocalDate showDate);

    List<ShowTime> findByCinemaId_CinemaIdAndMovieId_MovieId(Long cinemaId, Long movieId);

}

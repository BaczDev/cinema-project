package com.booking_cinema.repository;

import com.booking_cinema.dto.response.booking.BookingResponse;
import com.booking_cinema.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    @Query("SELECT COUNT(b) > 0 FROM Booking b JOIN b.seatId s WHERE b.showtimeId.showtimeId = :showtimeId AND s.seatId = :seatId")
    boolean existsByShowtimeIdAndSeatId(Long showtimeId, Long seatId);
    List<Booking> findAllByUserId_UserId(Long userId);
}

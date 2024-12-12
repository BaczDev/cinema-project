package com.booking_cinema.service.booking;

import com.booking_cinema.dto.request.booking.BookingRequest;
import com.booking_cinema.dto.response.booking.BookingResponse;
import com.booking_cinema.exception.AppException;
import com.booking_cinema.exception.ErrorCode;
import com.booking_cinema.model.*;
import com.booking_cinema.model.Seat;
import com.booking_cinema.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService implements IBookingService{
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final CinemaRepository cinemaRepository;
    private final MovieRepository movieRepository;
    private final SeatRepository seatRepository;
    private final ShowtimeRepository showtimeRepository;

    @Override
    public List<BookingResponse> createBooking(BookingRequest request) {
        User existingUser = userRepository.findById(request.getUserId()).orElseThrow(() ->
                new AppException(ErrorCode.USER_NOTFOUND));
        Cinema existingCinema = cinemaRepository.findById(request.getCinemaId()).orElseThrow(() ->
                new AppException(ErrorCode.CINEMA_NOTFOUND));
        ShowTime existingShowtime = showtimeRepository.findById(request.getShowtimeId()).orElseThrow(() ->
                new AppException(ErrorCode.SHOWTIME_NOTFOUND));
        Movie existingMovie = movieRepository.findById(request.getMovieId()).orElseThrow(() ->
                new AppException(ErrorCode.MOVIE_NOTFOUND));

        List<Seat> seats = seatRepository.findAllById(request.getSeatId());
        if (seats.size() != request.getSeatId().size()) {
            throw new AppException(ErrorCode.SEAT_NOTFOUND);
        }

        for (Seat seat : seats) {
            if (bookingRepository.existsByShowtimeIdAndSeatId(request.getShowtimeId(), seat.getSeatId())) {
                throw new AppException(ErrorCode.SEAT_BOOKED);
            }
        }

        List<Booking> newBookings = new ArrayList<>();
        for (Seat seat : seats) {
            Booking newBooking = new Booking();
            newBooking.setPrice(request.getPrice());
            newBooking.setUserId(existingUser);
            newBooking.setCinemaId(existingCinema);
            newBooking.setMovieId(existingMovie);
            newBooking.setSeatId(seat);
            newBooking.setShowtimeId(existingShowtime);

            newBookings.add(newBooking);
        }

        // Lưu tất cả Booking vào database
        List<Booking> savedBookings = bookingRepository.saveAll(newBookings);

        // Trả về danh sách BookingResponse
        return savedBookings.stream()
                .map(BookingResponse::toBookingResponse)
                .toList();

    }

    @Override
    public List<BookingResponse> getBookingWithUserId(Long userId) {
        userRepository.findById(userId).orElseThrow(() ->
                new AppException(ErrorCode.USER_NOTFOUND));
        List<Booking> list = bookingRepository.findAllByUserId_UserId(userId);
        return list.stream()
                   .map(BookingResponse::toBookingResponse)
                   .toList();
    }
}

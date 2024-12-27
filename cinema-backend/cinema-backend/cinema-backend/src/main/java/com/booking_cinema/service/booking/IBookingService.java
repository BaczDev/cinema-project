package com.booking_cinema.service.booking;

import com.booking_cinema.dto.request.booking.BookingRequest;
import com.booking_cinema.dto.response.booking.BookingResponse;

import java.util.List;

public interface IBookingService {
    List<BookingResponse> createBooking(BookingRequest request);
    List<BookingResponse> getBookingWithUserId(Long userId);

    List<BookingResponse> getAllBooking();
}

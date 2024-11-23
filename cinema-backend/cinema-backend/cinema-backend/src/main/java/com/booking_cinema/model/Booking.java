package com.booking_cinema.model;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "bookings")
@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @Column(name = "price")
    private float price;

    @Column(name = "seat_status")
    private String seatStatus;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userId;

    @ManyToOne
    @JoinColumn(name = "cinema_id")
    private Cinema cinemaId;

    @ManyToOne
    @JoinColumn(name = "seat_id")
    private Seat seatId;

    @ManyToOne
    @JoinColumn(name = "showtime_id")
    private ShowTime showtimeId;
}
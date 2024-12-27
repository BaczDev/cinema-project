package com.booking_cinema.model;

import com.booking_cinema.model.BaseEntity;
import com.booking_cinema.model.Room;
import jakarta.persistence.*;
import lombok.*;

@Table(name = "seats")
@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Seat extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seatId;

    @Column(name = "seat_type")
    private String seatType;

    private int number;

    @Column(name = "row_seat")
    private int rowSeat;

    private int price;

    @JoinColumn(name = "room_id")
    @ManyToOne
    private Room roomId;
}

package com.booking_cinema.model;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "rooms")
@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @Column(name = "room_name")
    private String roomName;

    @JoinColumn(name = "cinema_id")
    @ManyToOne
    private Cinema cinemaId;
}

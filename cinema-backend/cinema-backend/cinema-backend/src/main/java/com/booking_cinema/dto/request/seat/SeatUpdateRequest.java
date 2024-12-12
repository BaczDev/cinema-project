package com.booking_cinema.dto.request.seat;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeatUpdateRequest {
    @NotNull(message = "SEAT_TYPE_NOTNULL")
    private String seatType;

    @NotNull(message = "SEAT_NUMBER_NOTNULL")
    private int number;

    @NotNull(message = "ROW_SEAT_NOTNULL")
    private int rowSeat;

    @NotNull(message = "ROOM_ID_NOTNULL")
    private Long roomId;
}

package com.booking_cinema.dto.request.room;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomRequest {
    @NotNull(message = "ROOM_NAME_NOTNULL")
    private String roomName;

    @NotNull(message = "CINEMA_ID_NOTNULL")
    private Long cinemaId;
}

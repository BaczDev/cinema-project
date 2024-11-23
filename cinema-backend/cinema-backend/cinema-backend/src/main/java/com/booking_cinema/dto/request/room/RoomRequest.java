package com.booking_cinema.dto.request.room;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomRequest {
    @NotBlank(message = "ROOM_NAME_NOT_BLANK")
    private String roomName;

    @NotNull(message = "CINEMA_ID_NOTNULL")
    private Long cinemaId;
}

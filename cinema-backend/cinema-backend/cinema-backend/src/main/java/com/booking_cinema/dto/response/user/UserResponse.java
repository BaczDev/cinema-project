package com.booking_cinema.dto.response.user;

import com.booking_cinema.model.Role;
import com.booking_cinema.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    private Long userId;
    private String userName;
    private String email;
    private String phoneNumber;
    private Role role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static UserResponse toUserResponse(User user){
        return UserResponse.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRoleId())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}

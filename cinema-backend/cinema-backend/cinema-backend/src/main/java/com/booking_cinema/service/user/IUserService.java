package com.booking_cinema.service.user;

import com.booking_cinema.dto.request.user.UserCreationRequest;
import com.booking_cinema.dto.request.user.UserUpdateRequest;
import com.booking_cinema.dto.response.user.UserResponse;
import com.booking_cinema.model.User;

import java.util.List;

public interface IUserService {
    UserResponse getUser(Long userId);
    List<UserResponse> getAllUsers();

    User createUser(UserCreationRequest request);
    UserResponse updateUser(Long userId, UserUpdateRequest request);
    void deleteUser(Long userId);
}

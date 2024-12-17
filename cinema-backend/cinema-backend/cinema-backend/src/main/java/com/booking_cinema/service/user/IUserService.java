package com.booking_cinema.service.user;

import com.booking_cinema.dto.request.user.UserCreationRequest;
import com.booking_cinema.dto.request.user.UserUpdateByAdminRequest;
import com.booking_cinema.dto.request.user.UserUpdateRequest;
import com.booking_cinema.dto.response.user.UserResponse;
import com.booking_cinema.model.User;

import java.util.List;

public interface IUserService {
    UserResponse getUser(Long userId);
    List<UserResponse> getAllUsers();

    UserResponse getMyInfo();

    UserResponse createUser(UserCreationRequest request);
    UserResponse updateUser(Long userId, UserUpdateRequest request);

    UserResponse updateUserByAdmin(Long userId, UserUpdateByAdminRequest request);
    void deleteUser(Long userId);
}

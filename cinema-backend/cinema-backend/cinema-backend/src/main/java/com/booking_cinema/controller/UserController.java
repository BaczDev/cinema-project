package com.booking_cinema.controller;

import com.booking_cinema.dto.request.user.UserCreationRequest;
import com.booking_cinema.dto.request.user.UserUpdateRequest;
import com.booking_cinema.dto.response.ApiResponse;
import com.booking_cinema.dto.response.user.UserResponse;
import com.booking_cinema.model.User;
import com.booking_cinema.service.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@Slf4j
@RequiredArgsConstructor
public class UserController {
    private final IUserService iUserService;

    @GetMapping("")
    public ApiResponse<List<UserResponse>> getAllUsers(){
        return ApiResponse.<List<UserResponse>>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iUserService.getAllUsers())
                .build();
    }
    @GetMapping("/{userId}")
    public ApiResponse<UserResponse> getUser(@PathVariable Long userId){
        return ApiResponse.<UserResponse>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iUserService.getUser(userId))
                .build();
    }

    @PostMapping("/register")
    public ApiResponse<User> createdUser(@RequestBody @Valid UserCreationRequest request){
        return ApiResponse.<User>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iUserService.createUser(request))
                .build();
    }
    @PutMapping("/update/{userId}")
    public ApiResponse<UserResponse> updatedUser(@PathVariable Long userId, @RequestBody @Valid UserUpdateRequest request){
        return ApiResponse.<UserResponse>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iUserService.updateUser(userId, request))
                .build();
    }

    @DeleteMapping("/delete/{userId}")
    public String deletedUser(@PathVariable Long userId){
        iUserService.deleteUser(userId);
        return "user has been deleted";
    }
}

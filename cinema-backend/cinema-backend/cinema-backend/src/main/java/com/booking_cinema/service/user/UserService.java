package com.booking_cinema.service.user;

import com.booking_cinema.dto.request.user.UserCreationRequest;
import com.booking_cinema.dto.request.user.UserUpdateRequest;
import com.booking_cinema.dto.response.user.UserResponse;
import com.booking_cinema.exception.AppException;
import com.booking_cinema.exception.ErrorCode;
import com.booking_cinema.model.User;
import com.booking_cinema.repository.UserRepository;
import com.booking_cinema.service.user.IUserService;
import lombok.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    @Override
    public UserResponse getUser(Long userId) {
        Optional<User> existingUser = userRepository.findById(userId);
        if (existingUser.isEmpty()){
            throw new AppException(ErrorCode.USER_NOTFOUND);
        }
        UserResponse userResponse = new UserResponse();
        userResponse.setUserId(existingUser.get().getUserId());
        userResponse.setUserName(existingUser.get().getUserName());
        userResponse.setEmail(existingUser.get().getEmail());
        userResponse.setPhoneNumber(existingUser.get().getPhoneNumber());
        userResponse.setCreatedAt(existingUser.get().getCreatedAt());
        userResponse.setUpdatedAt(existingUser.get().getUpdatedAt());
        return userResponse;
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                              .stream()
                              .map(user -> new UserResponse(
                                      user.getUserId(),
                                      user.getUserName(),
                                      user.getEmail(),
                                      user.getPhoneNumber(),
                                      user.getCreatedAt(),
                                      user.getUpdatedAt()
                              ))
                              .toList();
    }

    @Override
    public User createUser(UserCreationRequest request) {
        if (userRepository.existsByUserName(request.getUserName())){
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        User newUser = new User();
        newUser.setUserName(request.getUserName());
        newUser.setPassword(request.getPassword());
        newUser.setEmail(request.getEmail());
        newUser.setPhoneNumber(request.getPhoneNumber());
        return userRepository.save(newUser);
    }

    @Override
    public UserResponse updateUser(Long userId, UserUpdateRequest request) {
        User existingUser = userRepository.findById(userId).orElseThrow(() ->
                new AppException(ErrorCode.USER_NOTFOUND));
        existingUser.setPassword(request.getPassword());
        existingUser.setEmail(request.getEmail());
        existingUser.setPhoneNumber(request.getPhoneNumber());
        userRepository.save(existingUser);
        UserResponse userResponse = new UserResponse();
        userResponse.setUserId(existingUser.getUserId());
        userResponse.setUserName(existingUser.getUserName());
        userResponse.setEmail(existingUser.getEmail());
        userResponse.setPhoneNumber(existingUser.getPhoneNumber());
        userResponse.setCreatedAt(existingUser.getCreatedAt());
        userResponse.setUpdatedAt(existingUser.getUpdatedAt());
        return userResponse;
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}

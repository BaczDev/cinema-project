package com.booking_cinema.service.user;

import com.booking_cinema.dto.request.user.UserCreationRequest;
import com.booking_cinema.dto.request.user.UserUpdateRequest;
import com.booking_cinema.dto.response.user.UserResponse;
import com.booking_cinema.exception.AppException;
import com.booking_cinema.exception.ErrorCode;
import com.booking_cinema.model.Role;
import com.booking_cinema.model.User;
import com.booking_cinema.repository.RoleRepository;
import com.booking_cinema.repository.UserRepository;
import com.booking_cinema.service.user.IUserService;
import lombok.*;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;
    @Override
    @PostAuthorize("returnObject.userName == authentication.name")
    public UserResponse getUser(Long userId) {
        User existingUser = userRepository.findById(userId).orElseThrow(() ->
                new AppException(ErrorCode.USER_NOTFOUND));

        UserResponse userResponse = UserResponse.toUserResponse(existingUser);
        return userResponse;
    }

    @Override
    public UserResponse getMyInfo(){
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        User user = userRepository.findByUserName(name).orElseThrow(() ->
                new AppException(ErrorCode.USER_NOTFOUND));
        UserResponse userResponse = UserResponse.toUserResponse(user);
        return userResponse;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                              .stream()
                              .map(user -> new UserResponse(
                                      user.getUserId(),
                                      user.getUserName(),
                                      user.getEmail(),
                                      user.getPhoneNumber(),
                                      user.getRoleId(),
                                      user.getCreatedAt(),
                                      user.getUpdatedAt()
                              ))
                              .toList();
    }

    @Override
    public UserResponse createUser(UserCreationRequest request) {
        if (userRepository.existsByUserName(request.getUserName())){
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        User newUser = new User();
        newUser.setUserName(request.getUserName());

        newUser.setPassword(passwordEncoder.encode(request.getPassword()));

        newUser.setEmail(request.getEmail());
        newUser.setPhoneNumber(request.getPhoneNumber());

        Role role = roleRepository.findById(1L).orElseThrow(() ->
                new AppException(ErrorCode.ROLE_NOTFOUND));
        newUser.setRoleId(role);

        userRepository.save(newUser);

        UserResponse userResponse = UserResponse.toUserResponse(newUser);
        return userResponse;
    }

    @Override
    public UserResponse updateUser(Long userId, UserUpdateRequest request) {
        User existingUser = userRepository.findById(userId).orElseThrow(() ->
                new AppException(ErrorCode.USER_NOTFOUND));

        existingUser.setPassword(passwordEncoder.encode(request.getPassword()));

        existingUser.setEmail(request.getEmail());
        existingUser.setPhoneNumber(request.getPhoneNumber());

        userRepository.save(existingUser);
        UserResponse userResponse = UserResponse.toUserResponse(existingUser);
        return userResponse;
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}

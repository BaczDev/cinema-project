package com.booking_cinema.configuration;

import com.booking_cinema.model.Role;
import com.booking_cinema.model.User;
import com.booking_cinema.repository.RoleRepository;
import com.booking_cinema.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationInnitConfig {

    private final PasswordEncoder passwordEncoder;

    private final RoleRepository roleRepository;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository){
        return args -> {
            if(userRepository.findByUserName("admin").isEmpty()){
                Role roleAdmin = roleRepository.findByRoleName("ADMIN");
                User user = User.builder()
                        .userName("admin")
                        .password(passwordEncoder.encode("admin"))
                        .email("admin@gmail.com")
                        .phoneNumber("admin_admin")
                        .roleId(roleAdmin)
                        .build();

                userRepository.save(user);
            }
        };
    }
}

package com.booking_cinema.model;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "roles")
@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long role_id;

    @Column(name = "role_name")
    private String roleName;
}

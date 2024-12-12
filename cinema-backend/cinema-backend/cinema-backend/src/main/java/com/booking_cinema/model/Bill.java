package com.booking_cinema.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Table(name = "bills")
@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Bill extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bill_id")
    private Long billId;

    @Column(name = "total_money")
    private float totalMoney;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userId;

}

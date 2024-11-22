package com.booking_cinema.model;


import jakarta.persistence.*;
import lombok.*;

@Table(name = "movies")
@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieId;

    @Column(name = "movie_name")
    private String movieName;

    @Column(name = "movie_poster_url")
    private String moviePosterUrl;

    @Column(name = "movie_length")
    private String movieLength;
}

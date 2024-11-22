package com.booking_cinema.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Table(name = "movie_details")
@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MovieDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieDetailId;

    @Column(name = "movie_description")
    private String movieDescription;

    @Column(name = "movie_trailer")
    private String movieTrailer;

    @Column(name = "movie_genre")
    private String movieGenre;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(name = "movie_language")
    private String movieLanguage;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movieId;
}

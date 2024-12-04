package com.booking_cinema.repository;

import com.booking_cinema.model.MovieDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieDetailRepository extends JpaRepository<MovieDetail, Long> {
    Optional<MovieDetail> findByMovieId_MovieId(Long movieId);

    boolean existsByMovieId_MovieId(Long movieId);
}

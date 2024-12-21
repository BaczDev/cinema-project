import axios from './CustomizeAxios';

const createMovieDetail = (token, movieDescription, movieTrailer,
                             movieGenre, releaseDate, movieLanguage, movieId, director, cast, rated) => {
    return axios.post("/api/v1/movieDetail/create", {
        movieDescription: movieDescription,
        movieTrailer: movieTrailer,
        movieGenre: movieGenre,
        releaseDate: releaseDate,
        movieLanguage: movieLanguage,
        movieId: movieId,
        director: director,
        cast: cast,
        rated: rated
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });                            

}

const uploadTrailer = (token, movieDetailId, file) => {
    const formData = new FormData();
    formData.append('files', file);
    return axios.post(`/api/v1/movieDetail/upload-trailer/${movieDetailId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    })
}

const getMovieDetailWithMovieId = (movieId) => {
    return axios.get(`/api/v1/movieDetail/movie/${movieId}`);
}

const updateMovieDetail = (token, movieDetailId, movieId, movieDescription, movieGenre, releaseDate, movieLanguage, 
                             director, cast, rated
) => {
    return axios.put(`/api/v1/movieDetail/update/${movieDetailId}`, {
        movieDescription: movieDescription,
        movieGenre: movieGenre,
        releaseDate: releaseDate,
        movieLanguage: movieLanguage,
        movieId: movieId,
        director: director,
        cast: cast,
        rated: rated
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export { createMovieDetail, uploadTrailer, getMovieDetailWithMovieId, updateMovieDetail };
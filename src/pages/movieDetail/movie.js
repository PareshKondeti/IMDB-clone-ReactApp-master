import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState();
  const [cast, setCast] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    getCast();
  }, [id]);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=3eab7a5b3651e613e0dd94b60eb2ca9e&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  };

  const getCast = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=3eab7a5b3651e613e0dd94b60eb2ca9e&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setCast(data.cast.slice(0, 10)));
  };

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ""
          }`}
          alt="Backdrop"
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.poster_path : ""
              }`}
              alt="Poster"
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentMovieDetail ? currentMovieDetail.original_title : ""}
            </div>
            <div className="movie__tagline">
              {currentMovieDetail ? currentMovieDetail.tagline : ""}
            </div>
            <div className="movie__rating">
              {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
              <i className="fas fa-star" />
              <span className="movie__voteCount">
                {currentMovieDetail
                  ? "(" + currentMovieDetail.vote_count + ") votes"
                  : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {currentMovieDetail
                ? currentMovieDetail.runtime + " mins"
                : ""}
            </div>
            <div className="movie__releaseDate">
              {currentMovieDetail
                ? "Release date: " + currentMovieDetail.release_date
                : ""}
            </div>
            <div className="movie__genres">
              {currentMovieDetail &&
                currentMovieDetail.genres &&
                currentMovieDetail.genres.map((genre) => (
                  <span className="movie__genre" key={genre.id}>
                    {genre.name}
                  </span>
                ))}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>
              {currentMovieDetail ? currentMovieDetail.overview : ""}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Cast</div>
            <div className="movie__cast">
              {cast.map((actor) => (
                <div key={actor.id} className="actor">
                  <div className="actor__image">
                    <img
                      src={`https://image.tmdb.org/t/p/original${
                        actor.profile_path ? actor.profile_path : "/default.jpg"
                      }`}
                      alt={actor.name}
                    />
                  </div>
                  <div className="actor__name">{actor.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    
    </div>
  );
};

export default Movie;

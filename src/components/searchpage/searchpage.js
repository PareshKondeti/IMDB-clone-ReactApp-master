import React, { useState } from "react";
import SearchBar from "../searchbar/searchbar";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (query) => {
    setIsLoading(true);
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=3eab7a5b3651e613e0dd94b60eb2ca9e&language=en-US&query=${query}&page=1`)
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error searching:", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="search-page">
      <SearchBar onSearch={handleSearch} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Search Results</h1>
          <div className="search-results">
            {searchResults.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;

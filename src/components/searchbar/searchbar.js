import React, { useState } from "react";
import "./searchbar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim() !== "") { // Ensure query is not empty
      onSearch(query);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="search-bar__input"
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={handleChange}
      />
      <button className="search-bar__button" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;

import React, { useState, useEffect } from 'react';
import "./Movies.css";
import Search from './Search';
import { useNavigate } from 'react-router-dom';

const Movies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("harry");
  const [favoriteLists, setFavoriteLists] = useState([]);
  const [listName, setListName] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [listCreated, setListCreated] = useState(false);

  const fetchMovies = (term) => {
    fetch(`https://www.omdbapi.com/?s=${term.trim()}&apikey=bafbcd87`)
      .then(res => res.json())
      .then(data => {
        if (data.Search) setMovies(data.Search.slice(0, 10));
        else setMovies([]);
      });
  };

  const handleSearch = () => {
    if (inputValue.trim() !== "") setSearchTerm(inputValue);
  };

  const addToFavorites = (movie) => {
    if (!favorites.find(f => f.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (imdbID) => {
    setFavorites(favorites.filter(fav => fav.imdbID !== imdbID));
  };

  const handleAddList = () => {
    if (listName.trim() !== "" && favorites.length > 0) {
      const newList = {
        name: listName.trim(),
        movies: [...favorites]
      };
      setFavoriteLists([...favoriteLists, newList]);
      setListName("");
      // setFavorites([]);
      setListCreated(true);
    }
  };

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

  return (
    <>
      <Search
        searchTerm={inputValue}
        setSearchTerm={setInputValue}
        handleSearch={handleSearch}
      />

      <div className="movies-page">
        <div className="movies-search-results">
          {movies.length ? (
            movies.map(movie => (
              <div className="movie-card" key={movie.imdbID}>
                <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} alt={movie.Title} />
                <div className="movie-card-right">
                  <p className="movie-title">{movie.Title}</p>
                  <p className="movie-year">Year: {movie.Year}</p>
                  <button
                    className={`movie-fav-button ${favorites.some(fav => fav.imdbID === movie.imdbID) ? "disabled" : ""}`}
                    onClick={() => addToFavorites(movie)}
                    disabled={favorites.some(fav => fav.imdbID === movie.imdbID)}
                  >
                    Favorite
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="not-found">Film tapılmadı və ya çoxlu nəticə mövcuddur.</p>
          )}
        </div>

        <div className="movies-favorites-panel">
          <div className="favorites-list">
            <ol>
              {favorites.map(fav => (
                <div className="favorites-item" key={fav.imdbID}>
                  <li>{fav.Title} ({fav.Year})</li>
                  {!listCreated && (
                    <button
                      className='x-button'
                      onClick={() => removeFromFavorites(fav.imdbID)}
                    >
                      x
                    </button>
                  )}
                </div>
              ))}
            </ol>
          </div>

          <div className="favorites-actions">
            <input
              type="text"
              className="favorites-input"
              placeholder="Enter list name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              disabled={listCreated}
            />

            <button
              className="favorites-add-button"
              onClick={handleAddList}
              disabled={listCreated || listName.trim() === ""}
            >
              Add Favorite
            </button>

            <button
              className="favorites-view-button"
              onClick={() => navigate('/favorites', { state: { favoriteLists } })}
              disabled={!listCreated}
            >
              Favorite List
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;
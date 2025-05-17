import React from 'react';
import './FavoriteList.css';
import { useLocation, useNavigate } from 'react-router-dom';

const FavoriteListsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const favoriteLists = location.state?.favoriteLists || [];

  return (
    <div className="favorite-page">
      <h2 className="favorite-title">Your Favorite Lists</h2>

      {favoriteLists.length === 0 && (
        <p className="no-lists-message">No favorite lists saved.</p>
      )}

      {favoriteLists.map((list, idx) => (
        <div key={idx} className="favorite-list-container">
          <h3 className="list-name">"{list.name}" list</h3>
          <ul className="movie-list">
            {list.movies.map(movie => (
              <li key={movie.imdbID} className="favorite-list-item">
                {movie.Title} ({movie.Year})
                <button
                  onClick={() => window.open(`https://www.imdb.com/title/${movie.imdbID}/`, '_blank')}
                  className="imdb-button"
                >
                  IMDb
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default FavoriteListsPage;

import React, { useState, useEffect } from 'react';
import './FavoriteList.css';
import { useLocation, useNavigate } from 'react-router-dom';

const FavoriteList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialLists = location.state?.favoriteLists || JSON.parse(localStorage.getItem("favoriteLists")) || [];
  const [favoriteLists, setFavoriteLists] = useState(initialLists);
  const handleDeleteList = (index) => {
    const updatedLists = [...favoriteLists];
    updatedLists.splice(index, 1);
    setFavoriteLists(updatedLists);
    localStorage.setItem("favoriteLists", JSON.stringify(updatedLists));
  };


  return (
    <div className="favorite-page">
      <h2 className='favorite-title'>Favorite Lists</h2>
      {favoriteLists.length === 0 && (
        <p className="no-lists-message">No favorite lists saved.</p>
      )}
      {favoriteLists.map((list, idx) => (
        <div key={idx} className="favorite-list-container">
          <div className="list-header">
            <h3 className="list-name">"{list.name}" list</h3>
            <button className="delete-button" onClick={() => handleDeleteList(idx)}>Delete</button>
          </div>
          <ul className="movie-list">
            {list.movies.map(movie => (
              <li key={movie.imdbID} className="favorite-list-item">
                {movie.Title} ({movie.Year})
                <a
                  href={`https://www.imdb.com/title/${movie.imdbID}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="imdb-button"
                >
                  IMDb
                </a>

              </li>
            ))}
          </ul>
        </div>
      ))}

      <button className="back-button" onClick={() => {
        sessionStorage.setItem('resetFavorites', 'true');
        navigate('/');
      }}>Back</button>
    </div>
  );
};

export default FavoriteList;

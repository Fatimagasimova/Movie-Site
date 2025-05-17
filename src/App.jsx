import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Movies from "./Components/Movies";
import Header from "./Components/Header";
import FavoriteList from "./Components/FavoriteList";

import './App.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/favorites" element={<FavoriteList />} />
      </Routes>
    </>
  );
}

export default App;

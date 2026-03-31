import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import ArtisansList from "./pages/ArtisansList";
import ArtisanDetail from "./pages/ArtisanDetail";
import MentionsLegales from "./pages/MentionsLegales";
import DonneesPersonnelles from "./pages/DonneesPersonnelles";
import Accessibilite from "./pages/Accessibilite";
import Cookies from "./pages/Cookies";
import NotFound from "./pages/NotFound";

function App() {
  //  État centralisé
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    setSearchSubmitted(true);
    setLoadingSearch(true);

    navigate(`/artisans?search=${encodeURIComponent(search)}`);

    fetch(
      `http://localhost:5000/api/artisans?search=${encodeURIComponent(search)}`
    )
      .then((res) => res.json())
      .then((data) => setResults(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Erreur recherche:", err))
      .finally(() => setLoadingSearch(false));
  };

  return (
    <div style={{ marginLeft: "0" }}>
      <Routes>
        {/* Page d’accueil */}
        <Route
          path="/"
          element={
            <Home
              search={search}
              setSearch={setSearch}
              handleSearch={handleSearch}
              results={results}
              loadingSearch={loadingSearch}
              searchSubmitted={searchSubmitted}
            />
          }
        />

        {/* Liste artisans */}
        <Route
          path="/artisans"
          element={
            <ArtisansList
              search={search}
              setSearch={setSearch}
              handleSearch={handleSearch}
            />
          }
        />

        {/* Liste artisans par catégorie */}
        <Route
          path="/categories/:slug"
          element={
            <ArtisansList
              search={search}
              setSearch={setSearch}
              handleSearch={handleSearch}
            />
          }
        />

        {/* Détail artisan */}
        <Route path="/artisans/:id" element={<ArtisanDetail />} />

        {/* Pages légales */}
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/donnees-personnelles" element={<DonneesPersonnelles />} />
        <Route path="/accessibilite" element={<Accessibilite />} />
        <Route path="/cookies" element={<Cookies />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

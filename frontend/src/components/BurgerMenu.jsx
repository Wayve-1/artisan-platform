import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./BurgerMenu.css";

export default function BurgerMenu({
  categories,
  search,
  setSearch,
  handleSearch,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="burger-container">
      {/* Bouton burger */}
      <button
        className={`burger-button ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Menu déroulant */}
      <nav className={`burger-menu ${open ? "show" : ""}`}>
        {/*  Barre de recherche intégrée */}
        <div className="burger-search">
          <SearchBar
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
          />
        </div>

        <ul>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/categories/${cat.slug}`}
                  onClick={() => setOpen(false)}
                >
                  {cat.nom}
                </Link>
              </li>
            ))
          ) : (
            <li>
              <span className="disabled">Chargement...</span>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

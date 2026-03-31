import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";
import SearchBar from "./SearchBar";
import logo from "../assets/logo.png";
import "./Header.css";

export default function Header({ search, setSearch, handleSearch }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Erreur categories:", err));
  }, []);

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Artisan Platform" className="logo-img" />
          </Link>
        </div>

        {/* Navigation desktop */}
        <nav className="main-nav">
          <ul>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link to={`/categories/${cat.slug}`}>{cat.nom}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ✅ SearchBar visible en desktop */}
        <div className="header-search">
          <SearchBar
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
          />
        </div>

        {/* Menu burger (mobile) */}
        <div className="burger-wrapper">
          <BurgerMenu
            categories={categories}
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
          />
        </div>
      </div>
    </header>
  );
}

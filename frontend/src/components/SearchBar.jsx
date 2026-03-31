import React from "react";

export default function SearchBar({ search, setSearch, handleSearch }) {
  console.log("SearchBar props:", { search, setSearch, handleSearch });
  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="🔎 Boulanger, électricien, Lyon..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="search-button">
        Rechercher
      </button>
    </form>
  );
}

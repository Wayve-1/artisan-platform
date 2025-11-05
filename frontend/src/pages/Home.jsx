import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../index.css";
import { Helmet } from "react-helmet";

export default function Home({
  search,
  setSearch,
  handleSearch,
  results = [],
  loadingSearch = false,
  searchSubmitted = false,
}) {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Debug props reçues
  console.log("Home props:", { search, setSearch, handleSearch });

  // Charger les artisans du mois
  useEffect(() => {
    fetch("http://localhost:5000/api/artisans/featured")
      .then((res) => res.json())
      .then((data) => setFeatured(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Erreur artisans du mois:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Helmet>
        <title>Accueil | Artisan</title>
        <meta
          name="Accueil"
          content="Découvrez nos artisans locaux par spécialité et catégorie. Trouvez facilement le professionnel qu'il vous faut."
        />
      </Helmet>

      <Header
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />

      <main className="home">
        {/* Résultats recherche */}
        {loadingSearch && <p>Recherche en cours...</p>}
        {searchSubmitted &&
          !loadingSearch &&
          Array.isArray(results) &&
          results.length === 0 && <p>Aucun artisan trouvé pour "{search}".</p>}
        {Array.isArray(results) && results.length > 0 && (
          <section className="search-results">
            <h2>Résultats de recherche</h2>
            <div className="artisan-grid">
              {results.map((a) => (
                <Link
                  to={`/artisans/${a.id}`}
                  key={a.id}
                  className="artisan-card"
                >
                  <h3>{a.nom}</h3>
                  <p>{a.specialite?.nom || "Spécialité inconnue"}</p>
                  <p>📍 {a.localisation}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Comment trouver mon artisan */}
        <section className="how-to-find">
          <h2>Comment trouver mon artisan ?</h2>
          <ol>
            <li>Choisir la catégorie d’artisanat dans le menu</li>
            <li>Choisir un artisan</li>
            <li>Le contacter via le formulaire de contact</li>
            <li>Une réponse sera apportée sous 48h</li>
          </ol>
        </section>

        {/* Artisans du mois */}
        <section className="featured-artisans">
          <h2>✨ Artisans du mois</h2>
          {loading ? (
            <p>Chargement...</p>
          ) : featured.length === 0 ? (
            <p>Aucun artisan mis en avant.</p>
          ) : (
            <div className="artisan-grid">
              {featured.map((a) => (
                <Link
                  to={`/artisans/${a.id}`}
                  key={a.id}
                  className="artisan-card"
                >
                  <h3>{a.nom}</h3>
                  <p>{a.specialite?.nom || "Spécialité inconnue"}</p>
                  <p>📍 {a.localisation}</p>
                  <div className="stars">
                    {Array.from({ length: Math.floor(a.note) }, (_, i) => (
                      <span key={`full-${i}`}>★</span>
                    ))}
                    {a.note % 1 >= 0.5 && <span>⯨</span>}
                    {Array.from({ length: 5 - Math.ceil(a.note) }, (_, i) => (
                      <span key={`empty-${i}`}>☆</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

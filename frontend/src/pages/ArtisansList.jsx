import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StarRating from "../components/StarRating";

export default function ArtisansList({ search, setSearch, handleSearch }) {
  const { slug } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryLabels = {
    alimentation: "Alimentation",
    batiment: "Bâtiment",
    fabrication: "Fabrication",
    services: "Services",
  };

  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams();

    if (slug && slug !== "undefined") {
      params.append("categorie", slug);
    }

    if (searchQuery) {
      params.append("search", searchQuery);
    }

    const url = `http://localhost:5000/api/artisans${
      params.toString() ? "?" + params.toString() : ""
    }`;

    console.log("➡️ URL appelée :", url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("➡️ Réponse API :", data);
        setArtisans(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Erreur artisans:", err))
      .finally(() => setLoading(false));
  }, [slug, searchQuery]);

  const pageTitle =
    slug && slug !== "undefined"
      ? `Artisans de la catégorie : ${
          artisans[0]?.specialite?.categorie?.nom ||
          categoryLabels[slug] ||
          slug
        }`
      : searchQuery
      ? `Résultats pour "${searchQuery}"`
      : "Tous les artisans";

  const metaDescription =
    slug && slug !== "undefined"
      ? `Découvrez nos artisans spécialisés en ${
          categoryLabels[slug] || slug
        }. Parcourez leurs profils et trouvez le professionnel qu’il vous faut.`
      : searchQuery
      ? `Résultats de recherche pour "${searchQuery}" parmi nos artisans locaux.`
      : "Parcourez la liste complète de nos artisans qualifiés dans l’alimentation, le bâtiment, la fabrication et les services.";

  return (
    <div>
      <Helmet>
        <title>{pageTitle} | Artisan</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      <Header
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />

      <main className="artisans-list">
        <h1>{pageTitle}</h1>

        {loading ? (
          <p>Chargement...</p>
        ) : artisans.length === 0 ? (
          <p>Aucun artisan trouvé.</p>
        ) : (
          <div className="artisan-grid">
            {artisans.map((a) => (
              <Link
                to={`/artisans/${a.id}`}
                key={a.id}
                className="artisan-card"
              >
                <h3>{a.nom}</h3>
                <p>{a.specialite?.nom || "Spécialité inconnue"}</p>
                <p>📍 {a.localisation}</p>
                <StarRating note={a.note} />
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

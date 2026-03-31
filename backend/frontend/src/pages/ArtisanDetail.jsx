import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

export default function ArtisanDetail() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/api/artisans/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && data.id) {
          setArtisan(data);
        } else {
          setError("404");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="loading">Chargement...</p>;
  if (error) {
    return (
      <div>
        <Header />
        <main className="artisan-detail">
          <p className="error">
            {error.includes("404") ? "Artisan introuvable." : "Erreur serveur."}
          </p>
          <Link to="/artisans" className="back-link">
            ← Retour à la liste
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const note = artisan?.note || 0;

  return (
    <div>
      <Helmet>
        <title>
          {artisan ? `${artisan.nom} | Artisan` : "Artisan introuvable"}
        </title>
        <meta
          name="description"
          content={
            artisan
              ? `Découvrez ${artisan.nom}, ${
                  artisan.specialite?.nom || "spécialité inconnue"
                } situé à ${artisan.localisation || "localisation inconnue"}.`
              : "Détail d'un artisan"
          }
        />
      </Helmet>

      <Header />
      <main className="artisan-detail">
        <Link to="/artisans" className="back-link">
          ← Retour à la liste
        </Link>

        {artisan && (
          <>
            {/* Photo */}
            <section className="artisan-photo">
              <img src={`/${artisan.image}`} alt={artisan.nom} />
            </section>

            {/* Infos principales */}
            <section className="artisan-info">
              <h1>{artisan.nom}</h1>
              <p>
                <strong>📍 Localisation :</strong>{" "}
                {artisan.localisation || "Non renseignée"}
              </p>
              <p>
                <strong>🔧 Spécialité :</strong>{" "}
                {artisan.specialite?.nom || "Non renseignée"}
              </p>
              <p>
                <strong>🏷 Catégorie :</strong>{" "}
                {artisan.specialite?.categorie?.nom || "Non renseignée"}
              </p>
            </section>

            {/* Description */}
            {artisan.description && (
              <section className="artisan-description">
                <h2>Description</h2>
                <p>{artisan.description}</p>
              </section>
            )}

            {/* Site web */}
            {artisan.site_web && (
              <section className="artisan-site">
                <h2>Site web</h2>
                <a
                  href={artisan.site_web}
                  target="_blank"
                  rel="noreferrer"
                  className="site-link"
                >
                  Visiter le site
                </a>
              </section>
            )}

            {/* Email */}
            {artisan.email && (
              <section className="artisan-email">
                <h2>Email</h2>
                <a href={`mailto:${artisan.email}`}>{artisan.email}</a>
              </section>
            )}

            {/* Note */}
            <section className="artisan-rating">
              <h2>Note</h2>
              <div className="stars">
                {Array.from({ length: Math.floor(note) }, (_, i) => (
                  <span key={`full-${i}`}>★</span>
                ))}
                {note % 1 >= 0.5 && <span>⯨</span>}
                {Array.from({ length: 5 - Math.ceil(note) }, (_, i) => (
                  <span key={`empty-${i}`}>☆</span>
                ))}
              </div>
            </section>

            {/* Formulaire de contact */}
            <section className="contact-section">
              <h2>Contacter {artisan.nom}</h2>
              <form className="contact-form">
                <input type="text" placeholder="Votre nom" required />
                <input type="email" placeholder="Votre email" required />
                <textarea placeholder="Votre message" required />
                <button type="submit">Envoyer</button>
              </form>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

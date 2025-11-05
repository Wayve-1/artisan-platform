import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

export default function Cookies() {
  return (
    <div>
      <Helmet>
        <title>Politique des Cookies | Artisan</title>
        <meta
          name="Cookies"
          content="Découvrez notre politique d’utilisation des cookies : types de cookies utilisés, finalités et gestion de vos préférences."
        />
      </Helmet>

      <Header />
      <main className="legal-page">
        <h1>Cookies</h1>
        <p>Page en construction</p>
      </main>
      <Footer />
    </div>
  );
}

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

export default function Accessibilite() {
  return (
    <div>
      <Helmet>
        <title>Accessibilité | Artisan</title>
        <meta
          name="Accessibilité"
          content="Découvrez notre politique d’accessibilité et les mesures mises en place pour rendre la plateforme utilisable par tous."
        />
      </Helmet>

      <Header />
      <main className="legal-page">
        <h1>Accessibilité</h1>
        <p>Page en construction</p>
      </main>
      <Footer />
    </div>
  );
}

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

export default function DonneesPersonnelles() {
  return (
    <div>
      <Helmet>
        <title>Données personnelles | Artisan</title>
        <meta
          name="Données personnelles"
          content="Consultez notre politique de protection des données personnelles et découvrez comment nous protégeons vos informations."
        />
      </Helmet>

      <Header />
      <main className="legal-page">
        <h1>Données personnelles</h1>
        <p>Page en construction</p>
      </main>
      <Footer />
    </div>
  );
}

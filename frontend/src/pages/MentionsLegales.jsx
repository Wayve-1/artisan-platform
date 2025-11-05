import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

export default function MentionsLegales() {
  return (
    <div>
      <Helmet>
        <title>Mentions légales | Artisan</title>
        <meta
          name="Mentions"
          content="Mentions légales de la plateforme Artisan : informations légales, éditeur du site et conditions d’utilisation."
        />
      </Helmet>

      <Header />
      <main className="legal-page">
        <h1>Mentions légales</h1>
        <p>Page en construction</p>
      </main>
      <Footer />
    </div>
  );
}

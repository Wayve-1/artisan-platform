import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import NotFoundImg from "../assets/404.svg";

export default function NotFound() {
  return (
    <div>
      <Helmet>
        <title>404 - Page non trouvée | Artisan</title>
        <meta
          name="404"
          content="La page que vous avez demandée est introuvable. Retournez à l'accueil pour découvrir nos artisans."
        />
      </Helmet>

      <Header />
      <main className="not-found">
        <h1>404 - Page non trouvée</h1>
        <img
          src={NotFoundImg}
          alt="Illustration page non trouvée"
          className="not-found-img"
        />
        <p>Oups ! La page que vous cherchez n’existe pas.</p>
      </main>
      <Footer />
    </div>
  );
}

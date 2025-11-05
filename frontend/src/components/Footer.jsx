import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/mentions-legales">Mentions légales</Link> |{" "}
        <Link to="/donnees-personnelles">Données personnelles</Link> |{" "}
        <Link to="/accessibilite">Accessibilité</Link> |{" "}
        <Link to="/cookies">Cookies</Link>
      </div>

      <div className="footer-contact">
        <p className="address">
          101 cours Charlemagne <br />
          CS 20033 <br />
          69269 LYON CEDEX 02 <br />
          France
        </p>
        <p className="phone">+33 (0)4 26 73 40 00</p>
      </div>
    </footer>
  );
}

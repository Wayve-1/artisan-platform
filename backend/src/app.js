const express = require("express");
const cors = require("cors");
const { sequelize } = require("./config/database.js");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API Artisans 🎨🔧" });
});

sequelize
  .authenticate()
  .then(() => console.log("✅ Connexion MySQL réussie"))
  .catch((err) => console.error("❌ Erreur MySQL :", err));

module.exports = app;

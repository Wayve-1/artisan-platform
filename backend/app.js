require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Import des routes
const artisanRoutes = require("./src/routes/artisan.routes");
const specialiteRoutes = require("./src/routes/specialite.routes");
const categorieRoutes = require("./src/routes/categorie.routes");

// Montage des routes
app.use("/api/artisans", artisanRoutes);
app.use("/api/specialites", specialiteRoutes);
app.use("/api/categories", categorieRoutes);

// Test de connexion DB
sequelize
  .authenticate()
  .then(() => console.log("✅ Connexion à la base de données réussie"))
  .catch((err) => console.error("❌ Erreur de connexion à la base :", err));

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});

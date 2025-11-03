require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./src/config/database.js");
const Artisan = require("./src/models/Artisan");
const Specialite = require("./src/models/Specialite");
const Categorie = require("./src/models/Categorie");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const artisanRoutes = require("./src/routes/artisan.routes");
app.use(artisanRoutes);
const categorieRoutes = require("./src/routes/categorie.routes");
app.use(categorieRoutes);
const specialiteRoutes = require("./src/routes/specialite.routes");
app.use(specialiteRoutes);
const contactRoutes = require("./src/routes/contact.routes");
app.use(contactRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API Artisans 🎨🔧" });
});

sequelize
  .authenticate()
  .then(() => console.log("✅ Connexion MySQL réussie"))
  .catch((err) => console.error("❌ Erreur MySQL :", err));

app.listen(PORT, () => {
  console.log(`🟢 Serveur lancé sur http://localhost:${PORT}`);
});

module.exports = app;

const { Sequelize } = require("sequelize");
require("dotenv").config();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("ENV VARS:", {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD ? "****" : undefined,
  DB_NAME: process.env.DB_NAME,
});

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
  }
);

// Test de connexion + création des tables
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connexion DB réussie");
    return sequelize.sync({ alter: true });
    // alter: true = adapte les tables aux modèles sans tout écraser
    // force: true = recrée tout à zéro (⚠️ ça supprime les données)
  })
  .then(() => {
    console.log("✅ Tables créées/mises à jour");
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion DB:", err);
  });

module.exports = { sequelize };

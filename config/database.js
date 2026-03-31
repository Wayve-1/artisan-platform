const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion PostgreSQL réussie");
    await sequelize.sync({ alter: true });
    console.log("✅ Tables créées/mises à jour");
  } catch (err) {
    console.error("❌ Erreur de connexion DB:", err.message);
  }
})();

module.exports = { sequelize };

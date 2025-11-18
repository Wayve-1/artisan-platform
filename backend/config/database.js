const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "mysql",
  logging: false,
});

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

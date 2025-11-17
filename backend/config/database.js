const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://user:password@containers-us-west-123.railway.app:5432/railway",
  {
    dialect: "postgres",
    logging: false,
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

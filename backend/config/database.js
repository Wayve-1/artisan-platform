const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.MYSQL_PUBLIC_URL, {
  dialect: "mysql",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Planetscale impose SSL
    },
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion DB réussie");
    await sequelize.sync({ alter: true });
    console.log("✅ Tables créées/mises à jour");
  } catch (err) {
    console.error("❌ Erreur de connexion DB:", err.message);
  }
})();

module.exports = { sequelize };

const { Sequelize } = require("sequelize");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const sequelize = new Sequelize(process.env.MYSQL_PUBLIC_URL, {
  dialect: "mysql",
  logging: false,
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connexion DB réussie");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("✅ Tables créées/mises à jour");
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion DB:", err);
  });

module.exports = { sequelize };

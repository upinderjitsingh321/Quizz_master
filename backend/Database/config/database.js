require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequilize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

sequilize
  .authenticate()
  .then(() =>
    console
      .log("database connected sucessfully")
      .catch((err) => console.log(err, "database unable to connect"))
  );

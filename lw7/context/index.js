const Sequelize = require("sequelize");
const config = require("../config.json");

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  config.db.options
);

const Pizzas = require("../models/pizza")(Sequelize, sequelize);
const Turtles = require("../models/turtle")(Sequelize, sequelize);
const Weapons = require("../models/weapon")(Sequelize, sequelize);

Turtles.belongsTo(Weapons, { foreignKey: "weaponId" });
Turtles.belongsTo(Pizzas, {
  as: "favoritePizza",
  foreignKey: "favoritePizzaId",
});
Turtles.belongsTo(Pizzas, {
  as: "secondFavoritePizza",
  foreignKey: "secondFavoritePizzaId",
});

sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.error("Error syncing database:", err));

module.exports = {
  pizzas: Pizzas,
  turtles: Turtles,
  weapons: Weapons,
  sequelize,
  Sequelize,
};

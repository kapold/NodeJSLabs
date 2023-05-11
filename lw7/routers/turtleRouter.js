const express = require("express");
const turtleController = require("../controllers/turtleController");
const errors = require("../helpers/errors");

module.exports = () => {
  let router = express.Router();

  router
    .route("/")
    .get((req, res, next) => {
      if (Object.keys(req.query).length === 0) {
        turtleController.getAllTurtles(req, res, next);
      } else {
        next();
      }
    })
    .get(turtleController.getTurtlesByFavoritePizza)
    .post(turtleController.createTurtle)
    .put(turtleController.updateTurtleById)
    .delete(turtleController.deleteTurtleById);

  router.route("/:id").get(turtleController.getTurtleById);

  router.route("/favoritePizzaBind").put(turtleController.bindFavoritePizza);

  router
    .route("/secondFavoritePizzaBind")
    .put(turtleController.bindSecondFavoritePizza);

  router.route("/weaponBind").put(turtleController.bindWeapon);

  router
    .route("/favoritePizzaUnbind")
    .delete(turtleController.unbindFavoritePizza);

  router
    .route("/secondFavoritePizzaUnbind")
    .delete(turtleController.unbindSecondFavoritePizza);

  router.route("/weaponUnbind").delete(turtleController.unbindWeapon);

  return router;
};

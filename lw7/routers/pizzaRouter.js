const express = require("express");
const pizzaController = require("../controllers/pizzaController");
const errors = require("../helpers/errors");

module.exports = () => {
  let router = express.Router();

  router
    .route("/")
    .get((req, res, next) => {
      if (Object.keys(req.query).length === 0) {
        pizzaController.getAll(req, res, next);
      } else {
        next();
      }
    })
    .get(pizzaController.getPizzasByCalories)
    .post(pizzaController.createPizza)
    .put(pizzaController.updatePizzaById)
    .delete(pizzaController.deletePizzaById)
    .all((req, res, next) => res.error(errors.methodNotAllowed));

  router
      .route("/superfat")
      .put(pizzaController.updateSuperFatPizzas)
      .all((req, res, next) => res.error(errors.methodNotAllowed));

  router
    .route("/:id")
    .get(pizzaController.getById)
    .all((req, res, next) => res.error(errors.methodNotAllowed));

  return router;
};

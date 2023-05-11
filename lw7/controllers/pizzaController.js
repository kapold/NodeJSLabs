const pizzaService = require("../services/pizzaService");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      res.json(await pizzaService.getAll());
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      res.json(await pizzaService.getById(req.params.id));
    } catch (error) {
      next(error);
    }
  },

  getPizzasByCalories: async (req, res, next) => {
    try {
      res.json(await pizzaService.getPizzasByCalories(req.query));
    } catch (error) {
      next(error);
    }
  },

  createPizza: async (req, res, next) => {
    try {
      const newPizza = req.body;
      res.json(await pizzaService.createPizza(newPizza));
    } catch (error) {
      next(error);
    }
  },

  updatePizzaById: async (req, res, next) => {
    try {
      const pizzaData = req.body;

      res.json(await pizzaService.updatePizzaById(pizzaData));
    } catch (error) {
      next(error);
    }
  },

  deletePizzaById: async (req, res, next) => {
    try {
      res.json(await pizzaService.deletePizzaById(req.body.id));
    } catch (error) {
      next(error);
    }
  },

  updateSuperFatPizzas: async (req, res, next) => {
    try {
      res.json(await pizzaService.updateSuperFatPizzas());
    } catch (error) {
      next(error);
    }
  },
};

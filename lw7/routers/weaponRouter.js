const express = require("express");
const weaponController = require("../controllers/weaponController");
const errors = require("../helpers/errors");

module.exports = () => {
  let router = express.Router();

  router
    .route("/")
    .get((req, res, next) => {
      if (Object.keys(req.query).length === 0) {
        weaponController.getAll(req, res, next);
      } else {
        next();
      }
    })
    .get(weaponController.getWeaponsByDps)
    .post(weaponController.createWeapon)
    .put(weaponController.updateWeaponById)
    .delete(weaponController.deleteWeaponById)
    .all((req, res, next) => res.error(errors.methodNotAllowed));

  router
    .route("/:id")
    .get(weaponController.getById)
    .all((req, res, next) => res.error(errors.methodNotAllowed));

  return router;
};

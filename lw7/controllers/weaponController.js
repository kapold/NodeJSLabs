const weaponService = require("../services/weaponService");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      res.json(await weaponService.getAll());
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      res.json(await weaponService.getById(req.params.id));
    } catch (error) {
      next(error);
    }
  },

  getWeaponsByDps: async (req, res, next) => {
    try {
      res.json(await weaponService.getWeaponsByDps(req.query));
    } catch (error) {
      next(error);
    }
  },

  createWeapon: async (req, res, next) => {
    try {
      const weaponData = req.body;
      res.json(await weaponService.createWeapon(weaponData));
    } catch (error) {
      next(error);
    }
  },

  updateWeaponById: async (req, res, next) => {
    try {
      const weaponData = req.body;

      res.json(await weaponService.updateWeaponById(weaponData));
    } catch (error) {
      next(error);
    }
  },

  deleteWeaponById: async (req, res, next) => {
    try {
      const weaponId = req.body.id;
      res.json(await weaponService.deleteWeaponById(weaponId));
    } catch (error) {
      next(error);
    }
  },
};

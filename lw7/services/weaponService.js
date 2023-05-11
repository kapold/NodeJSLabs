const Weapon = require("../context").weapons;
const Sequelize = require("../context").Sequelize;
const errors = require("../helpers/errors");

module.exports = {
  getAll: async () => {
    return Weapon.findAll();
  },

  getById: async (id) => {
    const weapon = await Weapon.findByPk(parseInt(id));
    if (!weapon) throw errors.entityNotFound;

    return weapon;
  },

  getWeaponsByDps: async (data) => {
    const { dps } = data;
    if (!dps) {
      throw errors.invalidInput("Please provide dps");
    }
    let query;
    const dpsNum = Number(dps.slice(2));
    if (dps.startsWith("gt")) {
      query = { where: { dps: { [Sequelize.Op.gt]: dpsNum } } };
    } else if (dps.startsWith("lt")) {
      query = { where: { dps: { [Sequelize.Op.lt]: dpsNum } } };
    } else {
      throw errors.invalidInput("Invalid query parameter");
    }
    const weapons = await Weapon.findAll(query);
    return weapons;
  },

  createWeapon: async (weaponData) => {
    const { name, dps } = weaponData;

    if (!name || !dps) {
      throw new Error("Name and dps are required");
    }

    if (dps > 500) {
      throw new Error("Dps must not exceed 500");
    }

    const weapon = await Weapon.create({
      name,
      dps,
    });

    return weapon;
  },

  updateWeaponById: async (weaponData) => {
    const weapon = await Weapon.findByPk(parseInt(weaponData.id));
    if (!weapon) {
      throw new Error("Weapon not found");
    }

    const { name, dps } = weaponData;

    if (name) {
      weapon.name = name;
    }
    if (dps > 500) {
      throw new Error("Dps must not exceed 500");
    }
    weapon.dps = dps;

    await weapon.save();
    return weapon;
  },

  deleteWeaponById: async (id) => {
    if (!Number.isInteger(id)) {
      throw new Error("Invalid id");
    }

    const weapon = await Weapon.findByPk(id);
    if (!weapon) {
      throw new Error("Weapon not found");
    }

    await weapon.destroy();
    return weapon;
  },
};

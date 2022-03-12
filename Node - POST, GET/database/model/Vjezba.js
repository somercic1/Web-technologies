const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  const Vjezba = sequelize.define("Vjezba", {
    brojVjezbi: Sequelize.STRING,
    brojZadataka: Sequelize.INTEGER
  });
  return Vjezba;
};
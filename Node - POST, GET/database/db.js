const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt2117894", "user", "pw", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
}
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

 

db.grupa = require(__dirname + "/model/Grupa.js")(sequelize,Sequelize.DataTypes);
db.student = require(__dirname + "/model/Student.js")(sequelize,Sequelize.DataTypes);
db.vjezba = require(__dirname + "/model/Vjezba.js")(sequelize,Sequelize.DataTypes);

db.zadatak = require(__dirname + "/model/Zadatak.js")(sequelize,Sequelize.DataTypes);



db.grupa.hasMany(db.student,{foreignKey: {allowNull:false}});
  db.student.belongsTo(db.grupa);


  db.vjezba.hasMany(db.zadatak,{foreignKey: {allowNull:false}});
  db.zadatak.belongsTo(db.vjezba);

module.exports = db; 
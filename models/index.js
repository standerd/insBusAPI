/* 
-------------------------------
Postgres SQL Database Setup
-------------------------------
*/

//import config db setup variables - DB on AWS RDS.
const dbConfig = require("../config/db.config.js");

//initialise Database.
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// model imports

db.Client = require("./Client.js")(sequelize, Sequelize);
db.Policy = require("./Policy.js")(sequelize, Sequelize);
db.ar_general = require("./ar_general.model.js")(sequelize, Sequelize);
db.ar_spec = require("./ar_spec.model.js")(sequelize, Sequelize);
db.vehicle = require("./vehicle.model.js")(sequelize, Sequelize);
db.property = require("./property.model.js")(sequelize, Sequelize);

//setup DB Table Relations

db.Client.hasOne(db.Policy, {foreignKey: "client_id"});
db.Policy.hasMany(db.vehicle, {sourceKey: "policy_number", foreignKey: "policy_number"});
db.Policy.hasMany(db.ar_general, {sourceKey: "policy_number", foreignKey: "policy_number"});
db.Policy.hasMany(db.ar_spec, {sourceKey: "policy_number", foreignKey: "policy_number"});
db.Policy.hasMany(db.property, {sourceKey: "policy_number", foreignKey: "policy_number"});


module.exports = db;

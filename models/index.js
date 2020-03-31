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

db.client = require("./client.model.js")(sequelize, Sequelize);
db.policy = require("./policy.model.js")(sequelize, Sequelize);
db.claim = require("./claim.model.js")(sequelize, Sequelize);

module.exports = db;

/* 
-----------------------------------------
Define a Policy Vehicle Item Data Model
-----------------------------------------
*/

module.exports = (sequelize, Sequelize) => {
  const Vehicle = sequelize.define("vehicles", {
    policy_number: {
      type: Sequelize.STRING
    },
    reg_no: {
      type: Sequelize.STRING
    },
    vehicle_value: {
      type: Sequelize.INTEGER
    },
    color: {
      type: Sequelize.STRING
    },
    make: {
      type: Sequelize.STRING
    },
    make: {
      type: Sequelize.STRING
    },
    model: {
      type: Sequelize.STRING
    },
    model_year: {
      type: Sequelize.STRING
    },
    premium: {
      type: Sequelize.INTEGER
    },
    excess: {
      type: Sequelize.INTEGER
    },
    risk: {
      type: Sequelize.STRING
    }
  });

  return Vehicle;
};

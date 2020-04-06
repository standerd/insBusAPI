/* 
------------------------------------------
Define a Policy Property Item Data Model
------------------------------------------
*/

module.exports = (sequelize, Sequelize) => {
  const Property = sequelize.define("properties", {
    policy_number: {
      type: Sequelize.STRING,
    },
    risk_value: {
      type: Sequelize.INTEGER,
    },
    property_type: {
      type: Sequelize.STRING,
    },
    property_structure: {
      type: Sequelize.STRING,
    },
    premium: {
      type: Sequelize.INTEGER,
    },
    excess: {
      type: Sequelize.INTEGER,
    },
    risk: {
      type: Sequelize.STRING,
    },
  });

  return Property;
};

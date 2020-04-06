/* 
---------------------------------------------------
Define a Policy All Risk General Item Data Model
---------------------------------------------------
*/

module.exports = (sequelize, Sequelize) => {
  const AR_gen = sequelize.define("ar_general", {
    policy_number: {
      type: Sequelize.STRING,
    },
    risk_value: {
      type: Sequelize.INTEGER,
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

  return AR_gen;
};

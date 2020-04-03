/* 
---------------------------------------------------
Define a Policy All Risk General Item Data Model
---------------------------------------------------
*/

module.exports = (sequelize, Sequelize) => {
  const AR_gen = sequelize.define("ar_general", {
    policy_number: {
      type: Sequelize.STRING
    },
    risk_value: {
      type: Sequelize.INTEGER
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

  AR_gen.associate = function(models) {
    AR_gen.belongsTo(models.policy, { foreignKey: "policy_no" });
  };

  return AR_gen;
};

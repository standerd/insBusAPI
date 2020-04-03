/* 
---------------------------------------------------
Define a Policy All Risk Specified Item Data Model
---------------------------------------------------
*/

module.exports = (sequelize, Sequelize) => {
  const AR_spec = sequelize.define("ar_specified", {
    policy_number: {
      type: Sequelize.STRING
    },
    risk_value: {
      type: Sequelize.INTEGER
    },
    item_type: {
      type: Sequelize.STRING
    },
    item_description: {
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

  AR_spec.associate = function(models) {
    AR_spec.belongsTo(models.policy, { foreignKey: "policy_no" });
  };

  return AR_spec;
};

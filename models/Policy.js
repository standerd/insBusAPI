/* 
-------------------------------------
Define the Client Policy Data Model
-------------------------------------
*/

module.exports = (sequelize, Sequelize) => {
  const Policy = sequelize.define("policy", {
    policy_number: {
      type: Sequelize.STRING
    },
    client_id: {
      type: Sequelize.INTEGER
    },
    policy_premium: {
      type: Sequelize.INTEGER
    }
  });

  return Policy;
};

/* 
-------------------------------------
Define the Client Policy Data Model
-------------------------------------
*/

module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("policy", {
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    tel_no: {
      type: Sequelize.STRING
    },
    cell_no: {
      type: Sequelize.STRING
    },
    id_no: {
      type: Sequelize.STRING
    },
    street_name: {
      type: Sequelize.STRING
    },
    suburb: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    postal_code: {
      type: Sequelize.STRING
    }
  });

  return Client;
};

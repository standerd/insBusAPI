/* 
------------------------------
Define a Business User Model
------------------------------
*/

module.exports = (sequelize, Sequelize) => {
  const BussUser = sequelize.define(
    "bussuser",
    {
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      id_no: {
        type: Sequelize.STRING
      },
      employee_no: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      tel_no: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      validated: {
        type: Sequelize.STRING
      }
    },
    {}
  );

  return BussUser;
};


module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customers", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      loyaltyPoints: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }, 
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
    return Customer;
  };
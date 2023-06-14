module.exports = (sequelize, Sequelize) => {
    const InventorySale = sequelize.define("inventorySales", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }, 
        price: {
            type: Sequelize.DECIMAL
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }, 
        created_by: {
            type: Sequelize.INTEGER 
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updated_by: {
            type: Sequelize.INTEGER
        }
    });
    return InventorySale;
  };
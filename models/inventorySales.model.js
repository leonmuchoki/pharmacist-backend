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
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }, 
        created_by: {
            type: DataTypes.INTEGER 
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_by: {
            type: DataTypes.INTEGER
        }
    });
    return InventorySale;
  };
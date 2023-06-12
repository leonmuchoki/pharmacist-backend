module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define("inventory", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DECIMAL
        },
        quantity: {
            type: DataTypes.DECIMAL
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
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
        }, 
    });
    return Inventory;
  };
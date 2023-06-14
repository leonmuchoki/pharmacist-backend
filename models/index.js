require('dotenv').config();
const config = require("../config/db.config.js");

const isProduction = process.env.NODE_ENV === 'production'
const Sequelize = require("sequelize");


const sequelize =  !isProduction ? new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: +config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
) :
new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.customer = require("../models/customer.model.js")(sequelize, Sequelize);
db.inventory = require("../models/inventory.model.js")(sequelize, Sequelize);
db.inventorySale = require("../models/inventorySales.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles", 
    foreignKey: "roleId",
    otherKey: "userId"
  });

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.inventory.hasMany(db.inventorySale, { as: "inventorySales" });
db.inventorySale.belongsTo(db.inventory, {
  foreignKey: "inventoryId",
  as: "inventory"
});

db.customer.hasMany(db.inventorySale, { as: "inventorySales" });
db.inventorySale.belongsTo(db.customer, {
  foreignKey: "customerId",
  as: "customer"
});

module.exports = db;
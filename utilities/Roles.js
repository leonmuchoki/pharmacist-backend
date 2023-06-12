const db = require("../models");
const Role = db.role;

exports.createInitialRoles = () => {
    Role.create({
        id: 1,
        name: "admin"
    });
    Role.create({
        id: 2,
        name: "pharmacist"
    });
    Role.create({
        id: 3,
        name: "customer"
    });
    Role.create({
        id: 4,
        name: "staff",
        description: "can do other stuff. Can be added only by admin"
    });
  };

  exports.ROLES = ["admin","pharmacist","customer","staff"];
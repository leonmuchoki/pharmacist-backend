var bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

/*seed test data*/
exports.createInitialUsers = () => {
    User.create({
        username: "admin",
        email: "admin@test.com",
        password: bcrypt.hashSync("test123", 8),
        isAdmin: true
    }).then(async(user) => {
        let adminRoles = ["admin"];
        await addRoleToUser(user, adminRoles);
    });

    User.create({
        username: "pharmacist1",
        email: "pharmacist1@test.com",
        password: bcrypt.hashSync("test123", 8)
    }).then(async(user) => {
        let pharmacistRoles = ["pharmacist"];
        await addRoleToUser(user, pharmacistRoles);
    });

    User.create({
        username: "customer1",
        email: "customer1@test.com",
        password: bcrypt.hashSync("test123", 8)
    }).then(async(user) => {
        let customerRoles = ["customer"];
        await addRoleToUser(user, customerRoles);
    });

    User.create({
        username: "staff1",
        email: "staff1@test.com",
        password: bcrypt.hashSync("test123", 8)
    }).then(async(user) => {
        let staffRoles = ["staff"];
        await addRoleToUser(user, staffRoles);
    });
  };

  const addRoleToUser = async(user, _roles) => {
    Role.findAll({
        where: {
          name: {
            [Op.or]: _roles
          }
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
         console.log("User: " + user.username + " and role " + _roles[0] + " seeded successfully!");
        });
      });
  }
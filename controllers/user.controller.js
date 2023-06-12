const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/*
admin can use this endpoint to add staff/pharmacist
*/
exports.addUser = async(req, res) => {
  const userData = await User.findOne({where: {email: req.body.email}});
  if (userData) {
    res.status(400).send({message: "User already exists"});
    return;
  }
  const randomPassword = Math.random().toString(36).slice(-8);
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(randomPassword, 8),
    isAdmin: req.body.hasOwnProperty('isAdmin') ? req.body.isAdmin : false,
    username: req.body.hasOwnProperty('username') ? req.body.username : '',
    mobile: req.body.hasOwnProperty('mobile') ? req.body.mobile : ''
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!", user });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!", user });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findUserById = (req, res) => {
  return User.findOne({where: {id:  req.params.userId}})
    .then((user) => {
      return res.status(200).send({user});
    })
    .catch((err) => {
      console.log(">> Error while finding user: ", err);
      res.status(500).send({ message: err.message });
    });
};

exports.resetUserPassword = async(req, res) => {
  try {
    const userData = await User.findOne({where: {id:  req.params.userId}});
    if(userData) {
      const randomPassword = Math.random().toString(36).slice(-8);
      const userUpdated = await User.update(
        { password: bcrypt.hashSync(randomPassword, 8) },
        { where: { id: req.params.userId } }
      );
      res.send({ message: "User Password reset successfully!", userData });
    } else {
      res.status(400).send({ message: "User not found", userData });
    }
  } catch(err) {
    res.status(400).send({ message: err });
  }
};

exports.deleteUser = async(req, res) => {
  try {
    const userData = await User.findOne({where: {id:  req.params.userId}});
    if(userData) {
      const userUpdated = await User.update(
        { deleted: true},
        { where: { id: req.params.userId } }
      );
      if(userUpdated) {
        res.send({ message: "User deactivated successfully!", userData });
      } else {
        res.status(400).send({ message: "Unable to delete user", userData });
      }
    } else {
      res.status(400).send({ message: "User not found", userData });
    }
  } catch(err) {
    res.status(400).send({ message: err });
  }
};

exports.activateUser = async(req, res) => {
  try {
    const userData = await User.findOne({where: {id:  req.params.userId}});
    if(userData) {
      const userUpdated = await User.update(
        { deleted: false},
        { where: { id: req.params.userId } }
      );
      if(userUpdated) {
        res.send({ message: "User activated successfully!", userData });
      } else {
        res.status(400).send({ message: "Unable to delete user", userData });
      }
    } else {
      res.status(400).send({ message: "User not found", userData });
    }
  } catch(err) {
    res.status(400).send({ message: err });
  }
};

exports.setLastLogin = async(req, res) => {
  try {
    const userData = await User.findOne({where: {id:  req.params.userId}});
    if(userData) {
      const userUpdated = await User.update(
        { lastLogin: new Date()},
        { where: { id: req.params.userId } }
      );
      if(userUpdated) {
        res.send({ message: "User login updated successfully!", userData });
      } else {
        res.status(400).send({ message: "Unable to update user data", userData });
      }
    } else {
      res.status(400).send({ message: "User not found", userData });
    }
  } catch(err) {
    res.status(400).send({ message: err });
  }
};
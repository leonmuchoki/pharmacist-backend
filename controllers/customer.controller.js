const { DATE } = require("sequelize");
const db = require("../models");
const Customer = db.customer;

exports.createCustomer = (req, res) => {
    Customer.create({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        createdBy: req.userId,
        updatedBy: req.userId,
      })
        .then(customer => {
          res.send({ message: "Customer posted successfully!", customer });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
};

exports.findCustomeryId = (req, res) => {
    return Customer.findOne({where: {id:  req.params.id}}, { include: ["inventorySales"] })
        .then(async(customer) => {
        return res.status(200).send({customer});
    })
        .catch((err) => {
        console.log(">> Error while finding customer: ", err);
        res.status(500).send({ message: err.message });
    });
};

exports.getAllCustomers = (req, res) => {
    return Customer.findAll().then((customers) => {
        return res.status(200).send({customers});
})
.catch((err) => {
    console.log(">> Error while loading  customers: ", err);
    res.status(500).send({ message: err.message });
    });;
};

exports.updateCustomer = (req, res) => {
    Customer.findByPk(req.params.id).then((customer) => {
      if(customer) {
        let updatedValues = {
          name: req.body.hasOwnProperty('name') ? req.body.name : customer.name,
          email: req.body.hasOwnProperty('email') ? req.body.email : customer.email,
          mobile: req.body.hasOwnProperty('mobile') ? req.body.mobile : customer.mobile
        }
        return customer.update(updatedValues).then((updatedRecord) => {
          return res.status(200).send({ message: "customer  updated successfully!", customer: updatedRecord });
        })
      } else {
        return  res.status(400).send({ message: "customer not found" });
      }
    }).catch((err) => res.status(500).send({ message: err.message }));
  };

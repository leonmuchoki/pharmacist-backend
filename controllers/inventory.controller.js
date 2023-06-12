const { DATE } = require("sequelize");
const db = require("../models");
const Inventory = db.inventory;
const User = db.user;

exports.createInventory = (req, res) => {
    Inventory.create({
        name: req.body.name,
        description: req.body.description,
        createdBy: req.userId,
        updatedBy: req.userId,
        price: req.body.price,
        quantity: req.body.quantity 
      })
        .then(inventory => {
          res.send({ message: "inventory posted successfully!", inventory });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
};

exports.findInventoryId = (req, res) => {
    return Inventory.findOne({where: {id:  req.params.id}})
        .then(async(inventory) => {
        return res.status(200).send({inventory});
    })
        .catch((err) => {
        console.log(">> Error while finding Inventory: ", err);
        res.status(500).send({ message: err.message });
    });
};

exports.getAllInventory = (req, res) => {
    return Issue.findAll().then((issues) => {
        return res.status(200).send({issues});
})
.catch((err) => {
    console.log(">> Error while loading  Inventory: ", err);
    res.status(500).send({ message: err.message });
    });;
};

exports.updateInventory = (req, res) => {
    Inventory.findByPk(req.params.id).then((inv) => {
      if(inv) {
        let updatedValues = {
          name: req.body.hasOwnProperty('name') ? req.body.name : inv.name,
          description: req.body.hasOwnProperty('description') ? req.body.description : inv.description,
          price: req.body.hasOwnProperty('price') ? req.body.price : inv.price,
          quantity: req.body.hasOwnProperty('quantity') ? req.body.quantity : inv.quantity
        }
        return inv.update(updatedValues).then((updatedRecord) => {
          return res.status(200).send({ message: "inventory  updated successfully!", inventory: updatedRecord });
        })
      } else {
        return  res.status(400).send({ message: "inventory not found" });
      }
    }).catch((err) => res.status(500).send({ message: err.message }));
  };

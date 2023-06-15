const { DATE } = require("sequelize");
const db = require("../models");
const InventorySale = db.inventorySale;
const Inventory = db.inventory;

exports.createInventorySale = (req, res) => {
    InventorySale.create({
        customerId: req.body.customerId || 0,//customer or non-customer
        inventoryId: req.body.inventoryId,
        createdBy: req.userId,
        updatedBy: req.userId,
        price: req.body.price,
        quantity: req.body.quantity 
      })
        .then(inventorySale => {
          //update inventory quantity
          Inventory.findByPk(req.body.inventoryId).then((inv) => {
            if(inv) {
              let newQuantity = +inv.quantity - +req.body.quantity;
              let updatedValues = {
                quantity: newQuantity < 0 ? 0 : newQuantity
              }
              inv.update(updatedValues);
            }
          });

          res.send({ message: "inventory transaction posted successfully!", inventorySale });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
};

exports.findInventoryTransactionById = (req, res) => {
    return InventorySale.findOne({where: {id:  req.params.id}}, { include: ["customer", "inventory"] })
        .then(async(inventoryTransaction) => {
        return res.status(200).send({inventoryTransaction});
    })
        .catch((err) => {
        console.log(">> Error while finding Inventory Transaction: ", err);
        res.status(500).send({ message: err.message });
    });
};

exports.getInventorySales = (req, res) => {
    return InventorySale.findAll({
        include: ["customer", "inventory"],
  }).then((inventorySales) => {
        return res.status(200).send({inventorySales});
})
.catch((err) => {
    console.log(">> Error while loading  Inventory Sales: ", err);
    res.status(500).send({ message: err.message });
    });;
};
const controller = require("../controllers/inventory.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.post(
    "/api/inventory",
    [authJwt.verifyToken, authJwt.isPharmacistOrAdmin],
    controller.createInventory
  );

  app.put("/api/inventory/:id", [authJwt.verifyToken], controller.updateInventory);
  app.get("/api/inventory/:id", [authJwt.verifyToken], controller.findInventoryId);
  app.get("/api/inventory", [authJwt.verifyToken], controller.getAllInventory);
};
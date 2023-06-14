const controller = require("../controllers/inventorySales.controller");
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
    [authJwt.verifyToken],
    controller.createInventorySale
  );

  app.get("/api/inventorysale/:id", [authJwt.verifyToken], controller.findInventoryTransactionById);
  app.get("/api/inventorysales", [authJwt.verifyToken], controller.getInventorySales);
};
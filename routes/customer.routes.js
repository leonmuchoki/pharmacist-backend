const controller = require("../controllers/customer.controller");
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
    "/api/customer",
    [authJwt.verifyToken],
    controller.createCustomer
  );

  app.put("/api/customer/:id", [authJwt.verifyToken], controller.updateCustomer);
  app.get("/api/customer/:id", [authJwt.verifyToken], controller.findCustomeryId);
  app.get("/api/customer", [authJwt.verifyToken], controller.getAllCustomers);
};
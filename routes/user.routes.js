const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const { isContractingAuthorityOrAdmin, isAdmin } = require("../middleware/authJwt");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/user", [authJwt.verifyToken, authJwt.isAdmin], controller.addUser);
  app.post("/api/user/delete/:userId",[authJwt.verifyToken, isAdmin], controller.deleteUser);
  app.post("/api/user/reset/:userId",[authJwt.verifyToken, isAdmin], controller.resetUserPassword);
  app.post("/api/user/activate/:userId",[authJwt.verifyToken, isAdmin], controller.activateUser);
  app.post("/api/user/last/login/:userId",[authJwt.verifyToken], controller.setLastLogin);
  

  app.get("/api/test/all", controller.allAccess);
  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get("/api/user/:userId",[authJwt.verifyToken], controller.findUserById);
};
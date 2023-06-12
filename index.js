//https://www.taniarascia.com/node-express-postgresql-heroku/

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsondoc = require("swagger-jsdoc");

require('dotenv').config();

const { swaggerOptions } = require("./swagger/options")
const { createInitialRoles } = require("./utilities/Roles");

const containerName = "filecontainer";

const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const specs = swaggerJsondoc(swaggerOptions);
app.use("/docs", swaggerUi.serve);
app.get(
  "/docs",
  swaggerUi.setup(specs, {
    explorer: true
  })
);

const db = require("./models");
const Role = db.role;
db.sequelize.sync({force: true}).then(() => {
//db.sequelize.sync().then(() => {
  console.log('Drop and Resync Db');
  //--initial();
  createInitialRoles();
}).catch((err) => {
  console.log(">> Error resyncing db: ", err);
});

//welcome
app.get("/", (req, res) => {
  res.json({ message: "Welcome to checkout system!" });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/inventory.routes')(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

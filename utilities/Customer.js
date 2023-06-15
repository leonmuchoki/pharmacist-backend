const db = require("../models");
const Customer = db.customer;

/*seed test data*/
exports.createInitialCustomer = () => {
    Customer.create({
        username: "non-customer",
        email: "noncustomer@test.com",
    });
};

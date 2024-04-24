const express = require("express");

const customerController =require("../controllers/customerController");
const {newCustomerController} = require("../controllers/customerController")
const router = express.Router();

router.post("/add", newCustomerController);

// router
// .route("/") 
// .get(customerController.getAllCustomer)
// .post(customerController.createCustomer);

// router
// .route("/")
  
module.exports = router;

const express = require("express");

const customerController =require("../controllers/customerController");
const {newCustomerController,getAllCustomers,getOneCustomer,deleteCustomer,updateCustomer} = require("../controllers/customerController")
const router = express.Router();

router.post("/add", newCustomerController);
router.get("/",getAllCustomers);
router.get("/get/:id",getOneCustomer);
router.delete("delete/:id",deleteCustomer);
router.put("/update/:id",updateCustomer);


  
module.exports = router;

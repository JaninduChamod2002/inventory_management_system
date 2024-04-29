
const express = require("express");
const returnController = require("../controllers/returnController");

const {newReturnController,getAllReturns,getOneReturn,deleteReturn,updateReturn} = require("../controllers/returnController")
const router = express.Router();

router.post("/add", newReturnController);
router.get("/",getAllReturns);
router.get("/get/:id",getOneReturn);
router.delete("/delete/:id",deleteReturn);
router.put("/update/:id",updateReturn);


module.exports = router;
const express = require('express');
const router = express.Router();
const {
    newPurchaseController,
    getAllPurchases,
    getOnePurchase,
    deletePurchase,
    updatePurchase
} = require('../controllers/purchaseController');

router.post("/add", newPurchaseController);
router.get("/", getAllPurchases);
router.get("/get/:id", getOnePurchase);
router.delete("/delete/:id", deletePurchase);
router.put("/update/:id", updatePurchase);

module.exports = router;





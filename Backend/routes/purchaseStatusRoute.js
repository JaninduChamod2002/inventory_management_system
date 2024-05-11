const express  = require('express');
const { newPurchaseStatusController, getAllPurchasesStatus, getOnePurchaseStatus, deletePurchaseStatus, updatePurchaseStatus }=require ('../controllers/purchaseStatusController');

const router = express.Router();

router.post("/add", newPurchaseStatusController);
router.get("/", getAllPurchasesStatus);
router.get("/get/:id", getOnePurchaseStatus);
router.delete("/delete/:id", deletePurchaseStatus);
router.put("/update/:id", updatePurchaseStatus);

module.exports = router;
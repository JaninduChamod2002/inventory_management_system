const express = require("express");
const returnController = require("../controllers/returnController");

const router = express.Router();

router
  .route("/")
  .get(returnController.getAllReturns)
  .post(returnController.newReturnController);

router
  .route("/:id")
  .get(returnController.getOneReturn)
  .patch(returnController.updateReturn)
  .delete(returnController.deleteReturn);

module.exports = router;

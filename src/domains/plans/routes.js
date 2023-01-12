const PlanController = require("./controller");
const express = require("express");
const router = new express.Router();

router.post(`/plan/add`, PlanController.insert);
router.post(`/plan/get`, PlanController.getPlan);
module.exports = router;
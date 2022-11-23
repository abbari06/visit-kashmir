const RecommendationController = require("./controller");
const express = require("express");
const router = new express.Router();

const url = "/recommendation";

router.post(`${url}/onboarding`, RecommendationController.RecommendationOnboarding);

module.exports = router;
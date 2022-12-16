const RecommendationController = require("./controller");
const express = require("express");
const router = new express.Router();

const url = "/recommendation";

router.post(`${url}/onboarding`, RecommendationController.RecommendationOnboarding);
router.post(`${url}/save`, RecommendationController.saveUserRecommendations);
router.post(`${url}/get`, RecommendationController.userRecommendation);

module.exports = router;
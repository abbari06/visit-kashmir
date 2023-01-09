const RecommendationController = require("./controller");
const express = require("express");
const router = new express.Router();
const auth = require("../../middleware/auth");
const url = "/recommendation";

router.post(`${url}/onboarding`, RecommendationController.RecommendationOnboarding);
router.post(`${url}/onboarding2`, RecommendationController.RecommendationOnboarding);
router.post(`${url}/save`, auth, RecommendationController.saveUserRecommendations);
router.post(`${url}/get`,auth, RecommendationController.userRecommendation);

module.exports = router;
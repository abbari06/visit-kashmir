const Express = require("express");
const router = Express.Router();

const PlaceRouter = require("../domains/places/routes");
const AttractionRouter = require("../domains/attractions/routes");
const RecreationalActivityRouter = require("../domains/recreational-activities/routes");
const EventRouter = require("../domains/events/routes");
const UserRouter = require("../domains/users/routes");
const FoodPlaceRouter = require("../domains/food-places/routes");

router.use(PlaceRouter);
router.use(AttractionRouter);
router.use(RecreationalActivityRouter);
router.use(EventRouter);
router.use(FoodPlaceRouter);
router.use(UserRouter);

module.exports = router;
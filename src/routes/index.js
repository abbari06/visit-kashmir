import  Express  from "express";
const router = Express.Router();
import PlaceRouter from "../domains/places/routes";
import AttractionRouter from "../domains/attractions/routes";
import RecreationalActivityRouter from "../domains/recreational-activities/routes";
import EventRouter from "../domains/events/routes"
import FoodPlaceRouter from "../domains/food-places/routes";
import UserRouter from "../domains/users/routes"
router.use(PlaceRouter);
router.use(AttractionRouter);
router.use(RecreationalActivityRouter);
router.use(EventRouter);
router.use(FoodPlaceRouter);
router.use(UserRouter);
export default router;

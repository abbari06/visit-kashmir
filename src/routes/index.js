import  Express  from "express";
const router = Express.Router();
import PlaceRouter from "../domains/places/routes";
import AttractionRouter from "../domains/attractions/routes";
import RecreationalActivityRouter from "../domains/recreational-activities/routes";
router.use(PlaceRouter)
router.use(AttractionRouter);
router.use(RecreationalActivityRouter);
export default router;

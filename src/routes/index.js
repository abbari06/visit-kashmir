import  Express  from "express";
const router = Express.Router();
import PlaceRouter from "../domains/places/routes";
import EventRouter from "../domains/events/routes"
router.use(PlaceRouter)
router.use(EventRouter)
export default router;

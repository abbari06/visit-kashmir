import  Express  from "express";
const router = Express.Router();
import PlaceRouter from "../domains/places/routes";
router.use(PlaceRouter)
export default router;

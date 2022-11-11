import PlaceController from "./controller";
import express from "express";
const router = new express.Router();

router.post(`/places/add`, PlaceController.insert);
router.patch(`/places/update/:id`, PlaceController.update);

export default router;
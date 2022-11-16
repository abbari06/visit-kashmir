import PlaceController from "./controller";
import express from "express";
const router = new express.Router();

router.post(`/places/add`, PlaceController.insert);
router.patch(`/places/update/:id`, PlaceController.update);
router.post(`/places/list`,PlaceController.list);

export default router;
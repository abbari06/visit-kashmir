import PlaceController from "./controller";
import express from "express";
const router = new express.Router();

router.post(`/places/add`, PlaceController.insert);
router.patch(`/places/update/:id`, PlaceController.update);
router.delete(`/places/delete/:id`, PlaceController.delete);
router.post(`/place/list`, PlaceController.getList);
router.get(`/place/get/:id`, PlaceController.getById);


export default router;
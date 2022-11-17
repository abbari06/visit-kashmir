import FoodPlaceController from "./controller";
import express from "express";
const router = new express.Router();

const url = '/foodplace'
router.post(`${url}/add`, FoodPlaceController.insert);
router.patch(`${url}/update/:id`, FoodPlaceController.update);
router.delete(`${url}/delete/:id`, FoodPlaceController.delete)
router.get(`${url}/get/:id`, FoodPlaceController.getById)
router.post(`${url}/list`, FoodPlaceController.getList)
router.post(`${url}/nearme`, FoodPlaceController.getNearPlaces)
export default router;
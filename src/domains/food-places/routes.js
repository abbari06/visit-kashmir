import FoodPlaceController from "./controller";
import express from "express";
const router = new express.Router();

router.post(`/foodplaces/add`, FoodPlaceController.insert);

export default router;
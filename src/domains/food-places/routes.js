const FoodPlaceController = require("./controller");
const express = require("express");
const router = new express.Router();

const url = '/foodplace'
router.post(`${url}/add`, FoodPlaceController.insert);
router.patch(`${url}/update/:id`, FoodPlaceController.update);
router.delete(`${url}/delete/:id`, FoodPlaceController.delete)
router.get(`${url}/get/:id`, FoodPlaceController.getById)
router.post(`${url}/list`, FoodPlaceController.getList)
router.post(`${url}/nearme`, FoodPlaceController.getNearPlaces);
router.post(`${url}/placename/:attraction`, FoodPlaceController.getByAttraction)

module.exports = router;
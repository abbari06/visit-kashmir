const PlaceController = require("./controller");
const express = require("express");
const router = new express.Router();

router.post(`/places/add`, PlaceController.insert);
router.patch(`/places/update/:id`, PlaceController.update);
router.delete(`/places/delete/:id`, PlaceController.delete);
router.post(`/placeslist`, PlaceController.getList);
router.get(`/places/get/:id`, PlaceController.getById);
router.get(`/places/name`, PlaceController.listOfPlaces)
module.exports = router;

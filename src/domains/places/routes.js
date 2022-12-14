const PlaceController = require("./controller");
const express = require("express");
const router = new express.Router();

router.post(`/place/add`, PlaceController.insert);
router.patch(`/place/update/:id`, PlaceController.update);
router.delete(`/place/delete/:id`, PlaceController.delete);
router.post(`/place/list`, PlaceController.getList);
router.get(`/place/get/:id`, PlaceController.getById);
router.get(`/place/name`, PlaceController.listOfPlaces);
router.get(`/place/topthree`, PlaceController.getTopThreeResult);
module.exports = router;

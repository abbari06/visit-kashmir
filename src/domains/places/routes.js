const PlaceController = require("./controller");
const express = require("express");
const router = new express.Router();

router.post(`/places/add`, PlaceController.insert);
router.patch(`/places/update/:id`, PlaceController.update);
router.delete(`/places/delete/:id`, PlaceController.delete);
router.post(`/place/list`, PlaceController.getList);
router.get(`/place/get/:id`, PlaceController.getById);

module.exports = router;

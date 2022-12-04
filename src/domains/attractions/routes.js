const AttractionController = require("./controller");
const express = require("express");
const router = new express.Router();
router.post(`/attraction/add`, AttractionController.insert);
router.patch("/attraction/update/:id", AttractionController.update);
router.delete("/attraction/delete/:id", AttractionController.delete);
router.get("/attraction/get/:id", AttractionController.getById);
router.post(`/attraction/list`, AttractionController.getList);
router.get(`/attraction/placename/:place`, AttractionController.getByPlaceName);
router.get(`/attraction/topthree`, AttractionController.getTopThreeResult);

module.exports = router;

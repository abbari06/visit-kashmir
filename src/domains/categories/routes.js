const CategoriesController = require("./controller");
const express = require("express");
const router = new express.Router();
const url = "/categories";
router.get(`${url}/list` , CategoriesController.get);

module.exports = router;
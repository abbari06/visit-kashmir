const MasterSearchController = require("./controller");
const express = require("express");
const router = new express.Router();

const url = "/search";

router.post(url, MasterSearchController.search);

module.exports = router;
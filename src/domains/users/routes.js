const UserController = require("./controller");
const express = require("express");
const router = new express.Router();

router.post("/user/register", UserController.register);

module.exports = router;
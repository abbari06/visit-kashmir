const UserController = require("./controller");
const express = require("express");
const router = new express.Router();

router.post("/user/signup", UserController.createUser);

module.exports = router;
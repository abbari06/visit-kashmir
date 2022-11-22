const UserController = require("./controller");
const express = require("express");
const router = new express.Router();

const url = "/user";

router.post(`${url}/onboarding`, UserController.userOnboarding);

module.exports = router;
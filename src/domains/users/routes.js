const UserController = require("./controller");
const express = require("express");
const router = new express.Router();

router.post("/user/register", UserController.register);
router.post("/user/verify", UserController.verify);
router.patch("/user/update/:id", UserController.update);
router.post("/user/login", UserController.login);
router.post("/user/loign/verify", UserController.verifyLogin);

module.exports = router;
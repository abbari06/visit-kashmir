import UserController from "./controller";
import express from "express";
const router = new express.Router();

const url = "/user";

router.post(`${url}/onboarding`, UserController.userOnboarding);

export default router;
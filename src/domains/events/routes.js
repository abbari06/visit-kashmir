import EventController from "./controller";
import express from "express";
const router = new express.Router();

router.post(`/events/add`, EventController.insert);

export default router;
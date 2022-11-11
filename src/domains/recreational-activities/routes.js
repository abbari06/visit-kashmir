import RecreationalActivityController from "./controller";
import express from "express";
const router = new express.Router();

router.post(`/recreational-activity/add`, RecreationalActivityController.insert);
router.patch(`/recreational-activity/update/:id`, RecreationalActivityController.update);
router.delete(`/recreational-activity/update/:id`, RecreationalActivityController.delete);

export default router;
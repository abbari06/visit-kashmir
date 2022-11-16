import EventController from "./controller";
import express from "express";
const router = new express.Router();

router.post(`/event/add`, EventController.insert);
router.patch(`/event/update/:id`, EventController.update);
router.delete(`/event/delete/:id`, EventController.delete);
router.get(`/event/get/:id`, EventController.getById);
router.post(`/event/list`, EventController.getList);
router.get(`/event/getByName/:place`, EventController.getEventByPlaceName);

export default router;
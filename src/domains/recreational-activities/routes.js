import RecreationalActivityController from "./controller";
import express from "express";
const router = new express.Router();

const url = '/recreational-activity';
router.post(url+`/add`, RecreationalActivityController.insert);
router.patch(url+`/update/:id`, RecreationalActivityController.update);
router.delete(url+`/delete/:id`, RecreationalActivityController.delete);
router.get(url+'/get/:id', RecreationalActivityController.getById);
router.post(url+'/list', RecreationalActivityController.getList);

export default router;
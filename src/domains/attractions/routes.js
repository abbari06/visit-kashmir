import AttractionController from "./controller";
import express from "express";
const router = new express.Router();

router.post(`/attractions/add`, AttractionController.insert);
router.patch('/attractions/update/:id', AttractionController.update);
router.delete('/attractions/delete/:id', AttractionController.delete);

export default router;
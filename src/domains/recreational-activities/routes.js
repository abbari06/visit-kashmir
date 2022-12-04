const RecreationalActivityController = require("./controller");
const express = require("express");
const router = new express.Router();

const url = '/recreational-activity';
router.post(url+`/add`, RecreationalActivityController.insert);
router.patch(url+`/update/:id`, RecreationalActivityController.update);
router.delete(url+`/delete/:id`, RecreationalActivityController.delete);
router.get(url+'/get/:id', RecreationalActivityController.getById);
router.post(url+'/list', RecreationalActivityController.getList);
router.post(`${url}/placename/:place`, RecreationalActivityController.getByPlaceName);
router.post(`${url}/topthree`, RecreationalActivityController.getTopThreeResult);

module.exports = router;
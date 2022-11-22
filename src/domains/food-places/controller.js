const MainController = require("../../controller/main-controller");
const FoodPlaceService = require("./service");
const FoodPlace = require("./FoodPlace");

const service = new FoodPlaceService(new FoodPlace().getInstance());

class FoodPlaceController extends MainController {
  constructor(service) {
    super(service);
  }
}

module.exports = new FoodPlaceController(service);

import MainController from "../../controller/main-controller";
import FoodPlaceService from "./service";
import FoodPlace from "./FoodPlace";

const service = new FoodPlaceService(new FoodPlace().getInstance());

class FoodPlaceController extends MainController {
  constructor(service) {
    super(service);
  }
}

export default new FoodPlaceController(service);

import MainController from "../../controller/main-controller";
import PlaceService from "./service";
import Place from "./Place";

const service = new PlaceService(new Place().getInstance());

class PlaceController extends MainController {
  constructor(service) {
    super(service);
  }
}

export default new PlaceController(service);

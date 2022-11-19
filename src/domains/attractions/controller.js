import MainController from "../../controller/main-controller";
import AttractionService from "./service";
import Attraction from "./Attraction";

const service = new AttractionService(new Attraction().getInstance());

class AttractionController extends MainController {
  constructor(service) {
    super(service);
  }

}

export default new AttractionController(service);

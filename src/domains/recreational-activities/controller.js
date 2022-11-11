import MainController from "../../controller/main-controller";
import RecreationActivityService from "./service";
import RecreationalActivity from "./RecreationalActivity";

const service = new RecreationActivityService(new RecreationalActivity().getInstance());

class RecreationalActivityController extends MainController {
  constructor(service) {
    super(service);
  }
}

export default new RecreationalActivityController(service);
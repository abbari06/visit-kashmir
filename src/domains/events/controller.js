import MainController from "./../../controller/main-controller";
import EventService from "./service";
import Event from "./Event";

const service = new EventService(new Event().getInstance());

class EventController extends MainController {
  constructor(service) {
    super(service);
  }
}

export default new EventController(service);
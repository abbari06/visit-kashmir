const MainController = require("../../controller/main-controller");
const EventService = require("./service");
const Event = require("./Event");
const service = new EventService(new Event().getInstance());

class EventController extends MainController {
  constructor(service) {
    super(service);
  }

}

module.exports = new EventController(service);

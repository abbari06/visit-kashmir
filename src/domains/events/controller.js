import MainController from "./../../controller/main-controller";
import EventService from "./service";
import Event from "./Event";
const service = new EventService(new Event().getInstance());

class EventController extends MainController {
  constructor(service) {
    super(service);
    this.getEventByPlaceName = this.getEventByPlaceName.bind(this);
  }

  
  async getEventByPlaceName(req, res) {
    let response = await this.service.getEventByPlaceName(req);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(201).send(response);
  }
}

export default new EventController(service);

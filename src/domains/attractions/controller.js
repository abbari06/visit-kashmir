const MainController = require("../../controller/main-controller");
const AttractionService = require("./service");
const Attraction = require("./Attraction");

const service = new AttractionService(new Attraction().getInstance());

class AttractionController extends MainController {
  constructor(service) {
    super(service);
  }
}

module.exports = new AttractionController(service);

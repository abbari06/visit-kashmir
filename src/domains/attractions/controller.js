const MainController = require("../../controller/main-controller");
const AttractionService = require("./service");
const Attraction = require("./Attraction");

const service = new AttractionService(new Attraction().getInstance());

class AttractionController extends MainController {
  constructor(service) {
    super(service);
    this.getAttractionId = this.getAttractionId.bind(this);
  }

  async getAttractionId(data,body){
    const ids = await service.getAttractionIdsByAttractionName(data);
    return ids
  }

}

module.exports = new AttractionController(service);

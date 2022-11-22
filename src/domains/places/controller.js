const MainController = require("../../controller/main-controller");
const PlaceService = require("./service");
const Place = require("./Place");

const service = new PlaceService(new Place().getInstance());

class PlaceController extends MainController {
  constructor(service) {
    super(service);
    this.getPlaceByName = this.getPlaceByName.bind(this)
  }

  
  async getPlaceByName(name){
    let place = await this.service.getPlaceByName(name);
    if(place){
      return place
    }
  }
}

module.exports = new PlaceController(service);

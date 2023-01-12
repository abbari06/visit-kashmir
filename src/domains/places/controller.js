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

  async listOfPlaces(req,res){
    let response = await this.service.getPlaceNameAndId();
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(201).send(response);
  }
}

module.exports = new PlaceController(service);

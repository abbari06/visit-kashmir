import MainController from "../../controller/main-controller";
import PlaceService from "./service";
import Place from "./Place";

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

export default new PlaceController(service);

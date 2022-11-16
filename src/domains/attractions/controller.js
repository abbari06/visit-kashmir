import MainController from "../../controller/main-controller";
import AttractionService from "./service";
import Attraction from "./Attraction";

const service = new AttractionService(new Attraction().getInstance());

class AttractionController extends MainController {
  constructor(service) {
    super(service);
    this.getAttractionByPlaceName = this.getAttractionByPlaceName.bind(this);
  }

 async getAttractionByPlaceName(req,res){
  let response = await this.service.getAttractionByPlaceName(req);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(201).send(response);
  }
}

export default new AttractionController(service);
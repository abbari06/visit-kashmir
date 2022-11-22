const MainController = require("../../controller/main-controller");
const FoodPlaceService = require("./service");
const FoodPlace = require("./FoodPlace");
const AttractionController = require("../attractions/controller");
const service = new FoodPlaceService(new FoodPlace().getInstance());

class FoodPlaceController extends MainController {
  constructor(service) {
    super(service);
    this.getByAttraction = this.getByAttraction.bind(this);
  }
 async getByAttraction(req,res){
     const attractionsIds= await AttractionController.getAttractionId(req.params);
     const response = await this.service.getItemsByAttraction(attractionsIds,req);
    return res.status(201).send(response);
 }
}

module.exports = new FoodPlaceController(service);

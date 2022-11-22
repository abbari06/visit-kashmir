const dbService = require("../../services/db-service");
const AttractionService=require("../attractions/service");
//const Attraction=require("../attractions/Attraction")
const service = new AttractionService();
class FoodPlaceService extends dbService{
    constructor(model){
        super(model);
    }
};

module.exports = FoodPlaceService;

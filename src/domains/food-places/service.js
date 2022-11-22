const dbService = require("../../services/db-service");

class FoodPlaceService extends dbService{
    constructor(model){
        super(model);
    }
};

module.exports = FoodPlaceService;

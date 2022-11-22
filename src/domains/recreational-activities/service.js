const dbService = require("../../services/db-service");

class RecreationActivityService extends dbService{
    constructor(model){
        super(model);
    }
};

module.exports = RecreationActivityService;
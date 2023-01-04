const MainController = require("../../controller/main-controller");
const RecreationActivityService = require("./service");
const RecreationalActivity = require("./RecreationalActivity");

const service = new RecreationActivityService(new RecreationalActivity().getInstance());

class RecreationalActivityController extends MainController {
  constructor(service) {
    super(service);  
  } 
}

module.exports = new RecreationalActivityController(service);
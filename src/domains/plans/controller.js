const MainController = require("../../controller/main-controller");
const PlanService = require("./service");
const Plan = require("./plan");

const service = new PlanService(new Plan().getInstance());

class PlanController extends MainController {
  constructor(service) {
    super(service);
    this.getPlan = this.getPlan.bind(this);
  }
  async getPlan(req,res){
    let plans = await this.service.getPlanByDays(req.body.totalDays);
    if (plans.error) return res.status(plans.statusCode).send(plans);
    return res.status(201).send(plans);
    
  }
}

module.exports = new PlanController(service);

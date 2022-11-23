const MainController = require("../../controller/main-controller");
const RecommendationService = require("./service");
const Recommendation = require("./Recommendation");
const service = new RecommendationService(new Recommendation().getInstance());

class RecommendationController extends MainController {
  constructor(service) {
    super(service);
    this.RecommendationOnboarding = this.RecommendationOnboarding.bind(this);
  }
  async RecommendationOnboarding(req,res) {
    const response = await this.service.recommendationOnboardingData(req.body);
    return res.status(200).send(response)
    // if(response.error) return res.status(response.statusCode).send(response);
    // return res.status(202).send(response);
  }
}

module.exports = new RecommendationController(service);

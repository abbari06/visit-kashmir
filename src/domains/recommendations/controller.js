const MainController = require("../../controller/main-controller");
const RecommendationService = require("./service");
const Recommendation = require("./Recommendation");
const service = new RecommendationService(new Recommendation().getInstance());
const autoBind = require("auto-bind");

class RecommendationController extends MainController {
  constructor(service) {
    super(service);
    autoBind(this);
  }
  async RecommendationOnboarding(req,res) {
    const response = await this.service.recommendationOnboardingData(req.body);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(201).send(response);
  }

  async saveUserRecommendations(req,res){
    const response = await this.service.saveUserRecommendation(req.body);
    if(response.error) return res.status(response.statusCode).send(response);
    return res.status(201).send(response);
  }

  async userRecommendation(req,res){
    const response = await this.service.getUserRecommendation(req.body);
    if(response.error) return res.status(response.statusCode).send(response);
    return res.status(200).send(response.data)
  }
}

module.exports = new RecommendationController(service);

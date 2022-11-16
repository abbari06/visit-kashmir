import MainController from "../../controller/main-controller";
import UserService from "./service";
import User from "./User";

const service = new UserService(new User().getInstance());

class UserController extends MainController {
  constructor(service) {
    super(service);
    this.userOnboarding = this.userOnboarding.bind(this);
  }
  async userOnboarding(req,res) {
    const response = await this.service.saveUserOnboardingData(req.body);
    if(response.error) return res.status(response.statusCode).send(response);
    return res.status(202).send(response);
  }
}

export default new UserController(service);

const MainController = require("../../controller/main-controller");
const autoBind = require("auto-bind");
const UserService = require("./service");
const User = require("./User");
const service = new UserService(new User().getInstance());

class UserController extends MainController{
    constructor(service) {
        super(service);
        autoBind(this);
      }
     async register(req,res){
        let response = await this.service.registerUser(req.body);
        console.log(response);
        // if (response.error) return res.status(response.statusCode).send(response);
        return res.status(202).send(response);
    }
}

module.exports = new UserController(service);
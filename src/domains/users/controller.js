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
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(202).send(response);
    }
    async verify(req,res){
        let response = await this.service.verifyUser(req.body);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(202).send(response);
    }

    async login(req,res){
        let response = await this.service.loginUser(req.body);
        if(response.error) return res.status(response.statusCode).send(response);
        return res.status(response.statusCode).send(response);
    }

    async verifyLogin(req,res){
        console.log(req.body);
        let response = await this.service.loginVerifyUser(req.body);
        if(response.error) return res.status(response.statusCode).send(response.data);
        return res.status(response.statusCode).send(response.data);
    }
}

module.exports = new UserController(service);
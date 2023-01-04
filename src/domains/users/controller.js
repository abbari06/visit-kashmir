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
        console.log(response.statusCode)
        return res.status(response.statusCode).send(response.message);
    }
    async verify(req,res){
        let response = await this.service.verifyUser(req.body);
        if (response.error) return res.status(response.statusCode).send(response);
        res.header('Authorization', response.token);
        return res.status(202).send(response);
    }

    async login(req,res){
        let response = await this.service.loginUser(req.body);
        if(response.error) return res.status(response.statusCode).send(response);
        return res.status(response.statusCode).send(response);
    }

    async verifyLogin(req,res){
        let response = await this.service.loginVerifyUser(req.body);
        if(response.error) return res.status(response.statusCode).send(response.data);
        res.header('Authorization', response.token);
        return res.status(response.statusCode).send(response.data);
    }
}

module.exports = new UserController(service);
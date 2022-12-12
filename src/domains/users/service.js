const dbService = require("../../services/db-service");
class UserService extends dbService{
    constructor(model) {
        super(model);
      }
    async createUser(user){
        try {
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }
    
}
module.exports = UserService
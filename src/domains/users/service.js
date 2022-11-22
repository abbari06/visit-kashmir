const dbService = require("../../services/db-service");
class UserService extends dbService{
    constructor(model){
        super(model);
    }

    async saveUserOnboardingData(data){
        try {
            const wizardData = await this.model.create(data);
            if(wizardData){
                return {
                    error: false,
                    statusCode: 201,
                    message:`User onboarding successfull.`,
                  };
            }
        } catch (error) {
            return {
                error: true,
                statusCode: 500,
                message: error.errmsg || "User onboarding unsuccessfull.",
                errors: error.errors,
              };
        }
    }
}

module.exports = UserService;
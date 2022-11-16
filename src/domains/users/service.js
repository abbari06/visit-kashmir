import dbService from "../../services/db-service";

class UserService extends dbService{
    constructor(model){
        super(model);
    }

    async saveUserOnboardingData(data){
        try {
            const item = await this.model.create(data);
            if(item){
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

export default UserService;
const dbService = require("../../services/db-service");
class PlanService extends dbService {
  constructor(model) {
    super(model);
  }
  async getPlanByDays(value) {
    console.log(value);
    try {
      console.log(this.model);
      const plans = await this.model.find({
        $and: [{ totalDays: value }, { deletedFlag: false }],
      })
      return plans;
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: "Not found",
      };
    }
  }
}

module.exports = PlanService;

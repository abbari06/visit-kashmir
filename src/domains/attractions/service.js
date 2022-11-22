const dbService = require("../../services/db-service");

class AttractionService extends dbService {
  constructor(model) {
    super(model);
  }
  async getAttractionIdsByAttractionName(data) {
    try {
      const attractions = await this.model
        .find({
          $and: [{ name: { $regex: data.attraction } }, { deletedFlag: false }],
        })
        .select("_id");
      return attractions;
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: "Not found",
      };
    }
  }
}

module.exports = AttractionService;

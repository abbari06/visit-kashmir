const dbService = require("../../services/db-service");
const autoBind = require("auto-bind");

class AttractionService extends dbService {
  constructor(model) {
    super(model);
    autoBind(this);
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

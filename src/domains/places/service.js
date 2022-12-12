const dbService = require("../../services/db-service");
class PlaceService extends dbService {
  constructor(model) {
    super(model);
  }

  async getPlaceByName(value) {
    try {
      const place = await this.model.find({
        $and: [{ name: { $regex: value.place } }, { deletedFlag: false }],
      }).select("_id");
        return place;
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: "Not found",
      };
    }
  }

  async getPlaceNameAndId(){
    try {
      const result = await this.model.find().select("name _id");
      return  {
        error:false,
        statusCode:202,
        result
      };
    } catch (error) {
      return{
      error:true,
      statusCode:500,
      error: "Something went wrong"}
    }
  }
}

module.exports = PlaceService;

import dbService from "../../services/db-service";
import PlaceController from "../places/controller";

class AttractionService extends dbService {
  constructor(model) {
    super(model);
  }

  async getAttractionByPlaceName(req) {
    const places = await PlaceController.getPlaceByName(req.params);
    const query = [];
    if (places) {
      for (let place of places) {
        query.push({ placeId: place._id, deletedFlag: false });
      }
    }
    try {
      const attraction = await this.model.find({ $or: query });
      return {
        error: false,
        statusCode: 202,
        attraction,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error.errmsg || "Coundn't delete",
        errors: error.errors,
      };
    }
  }
}

export default AttractionService;

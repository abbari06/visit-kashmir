import dbService from "../../services/db-service";
import PlaceController from "../places/controller";
class EventService extends dbService {
  constructor(model) {
    super(model);
  }
  async getEventByPlaceName(req) {
    const places = await PlaceController.getPlaceByName(req.params);
    const query = [];
    if (places) {
      for (let place of places) {
        query.push({ placeId: place._id, deletedFlag: false });
      }
    }
    try {
      const events = await this.model.find({ $or: query });
      return {
        error: false,
        statusCode: 202,
        events
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error.errmsg || "Something went wrong",
        errors: error.errors,
      };
    }
  }
  }


export default EventService;

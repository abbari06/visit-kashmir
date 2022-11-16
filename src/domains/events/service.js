import dbService from "../../services/db-service";
import PlaceController from "../places/controller";
class EventService extends dbService {
  constructor(model) {
    super(model);
  }
  async getEventByPlaceName(req) {
    const place = await PlaceController.getPlaceByName(req.params);
    if (place) {
      const event = await this.model.find({ placeId: place._id });
      return {
        error: false,
        statusCode: 201,
        event,
      };
    }
  }
}

export default EventService;

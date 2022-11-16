import dbService from "../../services/db-service";

class PlaceService extends dbService {
  constructor(model) {
    super(model);
  }

  
  async getPlaceByName(value) {
    try {
      const place = await this.model.findOne({ name: value.place });
      if (!place.deletedFlag) {
        return place
      } 
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: "Not found",
      };
    }
  }
}

export default PlaceService;

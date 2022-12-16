const Place = require("../places/Place");
const Attraction = require("../attractions/Attraction");
const FoodPlace = require("../food-places/FoodPlace");
const Event = require("../events/Event");
const RecreationalActivity = require("../recreational-activities/RecreationalActivity");
const PlaceService = require("../places/service");
const AttractionService = require("../attractions/service");
const FoodPlaceService = require("../food-places/service");
const EventService = require("../events/service");
const RecreationalActivityService = require("../recreational-activities/service");
const placeService = new PlaceService(new Place().getInstance());
const attractionService = new AttractionService(new Attraction().getInstance());
const foodPlaceService = new FoodPlaceService(new FoodPlace().getInstance());
const eventService = new EventService(new Event().getInstance());
const recreationalActivityService = new RecreationalActivityService(
  new RecreationalActivity().getInstance()
);

class MasterSearchService {
  async search(req) {
    let totalElements = 0;
    if (req.body.limit) {
      req.body.limit = req.body.limit / 5;
      if (req.body.limit < 1) {
        req.body.limit = 1;
      }
    }
    try {
      const places = await placeService.list(req.body);
      const attractions = await attractionService.list(req.body);
      const foodPlaces = await foodPlaceService.list(req.body);
      const events = await eventService.list(req.body);
      const recreationalActivities = await recreationalActivityService.list(
        req.body
      );
      totalElements =
        places.totalDocs +
        attractions.totalDocs +
        foodPlaces.totalDocs +
        events.totalDocs +
        recreationalActivities.totalDocs;
      return {
        data: {
          places: places.data,
          attrations: attractions.data,
          foodPlaces: foodPlaces.data,
          events: events.data,
          recreationalActivities: recreationalActivities.data,
        },
        totalElements,
      };
    } catch (error) {
      return {
        error: true,
        error: error.message,
        statusCode: 500,
      };
    }
  }
}

module.exports = MasterSearchService;

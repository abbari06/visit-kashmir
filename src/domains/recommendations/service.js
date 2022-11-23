const dbService = require("../../services/db-service");
const AttractionController = require("../attractions/controller");
const EventController = require("../events/controller");
const FoodPlaceController = require("../food-places/controller");
const RecreationalActivityController = require("../recreational-activities/controller");
class RecommendationService extends dbService {
  constructor(model) {
    super(model);
  }

  async recommendationOnboardingData(body) {
    const kmrLastSlotTime = 23;
    const slot = 1;
    const currentSlot = parseInt(body.itineraryForm[0].checkIn) + slot;
    const totalSlots = kmrLastSlotTime - currentSlot;
    const recommendation = [];
    const query = body.query;
    if (totalSlots) {
      try {
        for(let i of body.itineraryForm){
          const placeId = i.action;
          const attractions = await AttractionController.getRecommendation(
            placeId,
            query
          );
          const foodplaces = await FoodPlaceController.getRecommendation(placeId, query);
          const events = await EventController.getRecommendation(
            placeId,
            query
          );
          const recreationalActivities =  await RecreationalActivityController.getRecommendation(placeId, query);
          recommendation.push({day:i.day,attractions,foodplaces,events,recreationalActivities});
          }
          return {
            error: false,
            statusCode: 202,
            recommendation
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
}

module.exports = RecommendationService;

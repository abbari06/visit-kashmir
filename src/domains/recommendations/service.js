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
    const placeId = body.itineraryForm[0].action;
    const recommendation = [];
    const query = body.query;
    if (totalSlots) {
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
      recommendation.push({day:1,attractions,foodplaces,events,recreationalActivities});
    }
    // console.log(body.itineraryForm[0].checkIn);
    //   for(let day of body.itineraryForm){
    //     if(day.trigger === "arrival"){
    //         let currentSlot = parseInt(day.checkIn) + slot;

    //     }
    //}
  }
}

module.exports = RecommendationService;

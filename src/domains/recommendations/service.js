const dbService = require("../../services/db-service");
const AttractionController = require("../attractions/controller");
const EventController = require("../events/controller");
const FoodPlaceController = require("../food-places/controller");
const RecreationalActivityController = require("../recreational-activities/controller");
const PropertiesReader = require('properties-reader');
const prop = PropertiesReader("app.properties");
class RecommendationService extends dbService {
  constructor(model) {
    super(model);
  }

  async recommendationOnboardingData(body) {
    const kmrLastSlotTime = 23;
    const slot = 1;
    var startSlot; 
    var endSlot;
    //= parseInt(body.itineraryForm[0].checkIn) + slot;
    //const totalSlots = kmrLastSlotTime - currentSlot;
    var placeId;
    var stayPlaceId=-1;
    const visitRecommendation = [];
    const stayRecommendation = [];
    const query = body.query;
    console.log(query);
    try {
      for (let i of body.itineraryForm){
        if(i.stay){
           placeId=i.action;
           stayPlaceId=placeId;
          if(i.trigger=="arrival"){
            startSlot=parseInt(i.arrivalTime)+(3*slot);
            query.startSlotTime = startSlot.toString();
            console.log(startSlot , "slottime");
            endSlot=kmrLastSlotTime;
          }
          if(i.trigger=="visit"){
            startSlot=9;
            endSlot=kmrLastSlotTime;
          }
          query.startSlotTime = startSlot.toString();
          const attractions = await AttractionController.getRecommendation(
            placeId,
            query
          );
          const foodplaces = await FoodPlaceController.getRecommendation(
            placeId,
            query
          );
          const events = await EventController.getRecommendation(
            placeId,
            query
          );
          const recreationalActivities =
            await RecreationalActivityController.getRecommendation(
              placeId,
              query
            );
          stayRecommendation.push({
            day: i.day,
            attractions,
            foodplaces,
            events,
            recreationalActivities,
          });
        }
        if(!i.stay){
          placeId=i.action;
          if(i.trigger=="arrival"){
            startSlot=(i.arrivalTime)+(2*slot);
            endSlot=17;
          }
          if(i.trigger=="visit"){
            startSlot=9;
            endSlot=17;
          }
          query.startSlotTime = startSlot.toString();
          const attractions = await AttractionController.getRecommendation(
            placeId,
            query
          );
          const foodplaces = await FoodPlaceController.getRecommendation(
            placeId,
            query
          );
          const events = await EventController.getRecommendation(
            placeId,
            query
          );
          const recreationalActivities =
            await RecreationalActivityController.getRecommendation(
              placeId,
              query
            );
          visitRecommendation.push({
            day: i.day,
            attractions,
            foodplaces,
            events,
            recreationalActivities,
          });
          if(stayPlaceId>-1){
            startSlot=19;
            console.log("stayyy");
            query.startSlotTime = startSlot.toString();
            const attractions = await AttractionController.getRecommendation(
              stayPlaceId,
              query
            );
            const foodplaces = await FoodPlaceController.getRecommendation(
              stayPlaceId,
              query
            );
            const events = await EventController.getRecommendation(
              stayPlaceId,
              query
            );
            const recreationalActivities =
              await RecreationalActivityController.getRecommendation(
                stayPlaceId,
                query
              );
            stayRecommendation.push({
              day: i.day,
              attractions,
              foodplaces,
              events,
              recreationalActivities,
            });
          }
        }
      }
      return {
        error: false,
        statusCode: 202,
        visitRecommendation,
        stayRecommendation
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
getProperty = (pty) => {return prop.get(pty);}
module.exports = RecommendationService;

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
    var placeId;
    var stayPlaceId=-1;
    const visitRecommendation = [];
    const stayRecommendation = [];
    const query = body.query;
    var startSlot;
    var endSlot;
    const hotelCheckInTime=getProperty("HOTEL_CHECKIN");
    const arrivalToHotelTime=getProperty("HOTEL_CHECKIN");
    const dayEndTime=getProperty("DAYEND_KMR");
    const visitStartSLot=getProperty("VISIT_START_SLOT");
    const visitEndSlot=getProperty("VISIT_END_SLOT");
    try {
      for (let i of body.itineraryForm){
        if(i.stay){
           placeId=i.action;
           stayPlaceId=placeId;
          if(i.trigger=="arrival"){
            startSlot=parseInt(i.arrivalTime)+hotelCheckInTime+arrivalToHotelTime;
            query.startSlotTime = startSlot.toString();
            endSlot=dayEndTime;
          }
          if(i.trigger=="visit"){
            startSlot=visitStartSLot;
            endSlot=dayEndTime;
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
            startSlot=parseInt(i.arrivalTime)+arrivalToHotelTime;
            endSlot=visitEndSlot;
          }
          if(i.trigger=="visit"){
            startSlot=visitStartSLot;
            endSlot=visitEndSlot;
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
            startSlot=visitEndSlot+arrivalToHotelTime;
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
      console.log(error);
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

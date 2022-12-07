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
   // const allRecommendations=[];
    const query = body.query;
    var startSlot;
    var endSlot;
    const arrivalDate=new Date(body.query.arrivalDate);
    console.log(arrivalDate)
    const slot=getProperty("SLOT");
    const hotelCheckInTime=getProperty("HOTEL_CHECKIN");
    const arrivalToHotelTime=getProperty("ARRIVAL_TO_HOTEL");
    const dayEndTime=getProperty("DAYEND_KMR");
    const visitStartSLot=getProperty("VISIT_START_SLOT");
    const visitEndSlot=getProperty("VISIT_END_SLOT");
    try {
      for (let i of body.itineraryForm){
        const currentDate=arrivalDate.setDate(arrivalDate.getDate()+i.day-1);
        query.currentDate=currentDate;
        if(i.trigger=="arrival"){
          placeId=i.action;
          endSlot=visitEndSlot;
          if(i.stay){
            stayPlaceId=placeId;
            endSlot=dayEndTime;
          }
          startSlot=parseInt(i.arrivalTime)+hotelCheckInTime+arrivalToHotelTime;
          if(endSlot-startSlot>=slot){
            query.startSlotTime = startSlot.toString();
            const recommendations=await this.getRecommendations(placeId,query);
                const day=`day${i.day}`;
                stayRecommendation.push({
                  [day]:{
                    recommendations
                }
                });
          }
        }else{
          placeId=i.action;
          endSlot=visitEndSlot;
          if(i.stay){
            stayPlaceId=placeId;
            endSlot=dayEndTime;
          }
          startSlot=visitStartSLot;
          if(endSlot-startSlot>=slot){
            query.startSlotTime = startSlot.toString();
            const recommendations=await this.getRecommendations(placeId,query);
                const day=`day${i.day}`;
                visitRecommendation.push({
                  [day]:{
                    recommendations
                }
                });
                if(stayPlaceId>-1 && stayPlaceId!=placeId){
                  const recommendations=await this.getRecommendations(stayPlaceId,query);
                  const day=`day${i.day}`;
                  stayRecommendation.push({
                    [day]:{
                      recommendations
                  }
                });
              
          }
        }
      }
      }
      return {
        error: false,
        statusCode: 202,
        stayRecommendation,
        visitRecommendation
        
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
  async getRecommendations(placeId,query){
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
    const recreationalActivities =await
      RecreationalActivityController.getRecommendation(
        placeId,
        query
      );
      return {attractions,foodplaces,
        events,
        recreationalActivities,}
  }
}

getProperty = (pty) => {return prop.get(pty);}
module.exports = RecommendationService;

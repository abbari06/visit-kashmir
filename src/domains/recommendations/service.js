const dbService = require("../../services/db-service");
const AttractionController = require("../attractions/controller");
const EventController = require("../events/controller");
const FoodPlaceController = require("../food-places/controller");
const RecreationalActivityController = require("../recreational-activities/controller");
const PropertyReader = require("../../property-reader");
const propertyReader = require("../../property-reader");
const Place=require("../places/Place");
const placeService=require("../places/service");
const PlaceService=new placeService(new Place().getInstance());
class RecommendationService extends dbService {
  constructor(model) {
    super(model);
  }
  async recommendationOnboardingData(body) {
    const days = {
      0:"sunday",
      1:"monday",
      2:"tuesday",
      3:"wednesday",
      4:"thursday",
      5:"friday",
      6:"saturday"
    };
    var placeId;
    var stayPlaceId = -1;
    const data = {};
    const query = body.query;
    var startSlot;
    var endSlot;
    
    const slot = PropertyReader.getProperty("SLOT");
    const hotelCheckInTime = PropertyReader.getProperty("HOTEL_CHECKIN");
    const arrivalToHotelTime = PropertyReader.getProperty("ARRIVAL_TO_HOTEL");
    const dayEndTime = PropertyReader.getProperty("DAYEND_KMR");
    const visitStartSLot = PropertyReader.getProperty("VISIT_START_SLOT");
    const visitEndSlot = PropertyReader.getProperty("VISIT_END_SLOT");
    const airportCheckInTime = propertyReader.getProperty(
      "AIRPORT_CHECKIN_TIME"
    );
    let hh = 0;
    let mm = 0;
    try {
      
      for (let i of body.itineraryForm) {
        const arrivalDate = new Date(body.query.arrivalDate);
        let obj = {};
        const currentDate = arrivalDate.setDate(
          arrivalDate.getDate()+ i.day - 1
        );
        let currentDay=new Date(currentDate).getDay();
        query.day=days[currentDay];
        query.currentDate = currentDate;
        if (i.trigger == "visit") {
          placeId = i.action;
          endSlot = visitEndSlot;
          if (i.stay || stayPlaceId == placeId) {
            stayPlaceId = placeId;
            endSlot = dayEndTime;
          }
          startSlot = visitStartSLot;
          const isSlot = await this.getSlots(endSlot, startSlot, slot);
          if (isSlot) {
            query.startSlotTime = startSlot;
            query.endSlotTime = endSlot;
            await this.setCoordinates(placeId,query);
            obj = await this.getRecommendations(placeId, query);
            const day = `${i.day}`;
            if (stayPlaceId > -1 && stayPlaceId != placeId) {
              [hh, mm] = visitEndSlot.split(":").map((x) => parseInt(x));
              hh = hh + slot * arrivalToHotelTime;
              const tempDate = arrivalDate.setHours(hh, mm);
              startSlot = new Date(tempDate).toTimeString().split(" ")[0];
              endSlot = dayEndTime;
              const isSlot = await this.getSlots(endSlot, startSlot, slot);
              if (isSlot) {
                query.startSlotTime = startSlot;
                query.endSlotTime = endSlot;
                const stayRecommendation = [];
                await this.setCoordinates(stayPlaceId,query);
                stayRecommendation.push(
                  await this.getRecommendations(stayPlaceId, query)
                );
                for (let key of Object.keys(obj)) {
                  for (let i = 0; i < stayRecommendation[0][key].length; i++) {
                    obj[key].push(stayRecommendation[0][key][i]);
                  }
                }
              }
            }
            data[day] = obj;
          }
        } else {
          //only for arrival and departure
          if (i.trigger == "departure") {
            placeId=i.action;
            [hh, mm] = i.departureTime.split(":").map((x) => parseInt(x));
          
            var d = new Date(arrivalDate).setHours(hh,mm);
            d = new Date(new Date(d).getTime() - (airportCheckInTime*60*60000));
            endSlot = new Date(d).toTimeString().split(" ")[0];
            startSlot = visitStartSLot;
            const isSlot = await this.getSlots(endSlot, startSlot, slot);
            if (isSlot) {
              query.startSlotTime = startSlot;
              query.endSlotTime = endSlot;
              await this.setCoordinates(placeId,query);
              obj = await this.getRecommendations(placeId, query);
              const day = `${i.day}`;
              data[day] = obj;
            }
          } else {
            placeId = i.action;
            endSlot = dayEndTime;
            if (!i.stay) {
              placeId = i.stayPlaceId;
            }
            stayPlaceId = placeId;
            var aTime = i.arrivalTime;
            [hh, mm] = aTime.split(":").map((x) => parseInt(x));
            hh = hh + slot * hotelCheckInTime + slot * arrivalToHotelTime;
            const tempDate = arrivalDate.setHours(hh, mm);
            startSlot = new Date(tempDate).toTimeString().split(" ")[0];
            const isSlot = await this.getSlots(endSlot, startSlot, slot);
            if (isSlot) {
              query.startSlotTime = startSlot;
              query.endSlotTime = endSlot;
              await this.setCoordinates(placeId,query);
              obj = await this.getRecommendations(placeId, query);
              const day = `${i.day}`;
              data[day] = obj;
            }
          }
        }
      }
      return {
        error: false,
        statusCode: 202,
        data,
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
  async getSlots(endSlot, startSlot, slot) {
    let [ehh, emm] = endSlot.split(":").map((x) => parseInt(x));
    let [shh, smm] = startSlot.split(":").map((x) => parseInt(x));
    ehh = ehh + emm / 100;
    shh = shh + smm / 100;
    if (ehh - shh >= slot) {
      return true;
    }
    return false;
  }
  async setCoordinates(id,query){
            const place=await PlaceService.getById(id);
            const coordinates=place.data.coordinates.coordinates;
            query.coordinates={
                $near: {
                  $geometry: {
                    type: "Point",
                    coordinates:[coordinates[0],coordinates[1]],
                  },
                  $maxDistance: 400000,
                },
            }
  }
  async getRecommendations(placeId, query) {
    const attractions = await AttractionController.getRecommendation(
      placeId,
      query
    );
    const foodplaces = await FoodPlaceController.getRecommendation(
      placeId,
      query
    );
    const events = await EventController.getRecommendation(placeId, query);
    const recreationalActivities =
      await RecreationalActivityController.getRecommendation(placeId, query);
    return { attractions, foodplaces, events, recreationalActivities };
  }

  async saveUserRecommendation(body) {
    try {
          let newUserRecommendation = await this.model.create(body);
          if (newUserRecommendation) {
            return {
              data: newUserRecommendation,
            };
          }
        } catch (error) {
          return {
            error: true,
            statusCode: 500,
            message: error.errmsg || "Not able to create",
            errors: error.errors,
          };
        }
    } 

  async getUserRecommendation(body) {
    try {
      let recommendations = await this.model.find({ userId: body.userId });
      if (recommendations) {
        return {
          data: recommendations,
        };
      } else throw new error();
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error.message,
      };
    }
  }
}
module.exports = RecommendationService;

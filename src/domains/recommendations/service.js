const dbService = require("../../services/db-service");
const AttractionController = require("../attractions/controller");
const EventController = require("../events/controller");
const FoodPlaceController = require("../food-places/controller");
const RecreationalActivityController = require("../recreational-activities/controller");
const PropertyReader = require("../../property-reader");
class RecommendationService extends dbService {
  constructor(model) {
    super(model);
  }
  async recommendationOnboardingData(body) {
    const keys = [
      "attractions",
      "foodplaces",
      "events",
      "recreationalActivities",
    ];
    var placeId;
    var stayPlaceId = -1;
    const allRecommendations = {};
    const query = body.query;
    var startSlot;
    var endSlot;
    const arrivalDate = new Date(body.query.arrivalDate);
    const slot = PropertyReader.getProperty("SLOT");
    const hotelCheckInTime = PropertyReader.getProperty("HOTEL_CHECKIN");
    const arrivalToHotelTime = PropertyReader.getProperty("ARRIVAL_TO_HOTEL");
    const dayEndTime = PropertyReader.getProperty("DAYEND_KMR");
    const visitStartSLot = PropertyReader.getProperty("VISIT_START_SLOT");
    const visitEndSlot = PropertyReader.getProperty("VISIT_END_SLOT");
    let hh = 0;
    let mm = 0;
    try {
      for (let i of body.itineraryForm) {
        let obj = {};
        const currentDate = arrivalDate.setDate(
          arrivalDate.getDate() + i.day - 1
        );
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
            // obj.push(await this.getRecommendations(placeId, query));
            obj=await this.getRecommendations(placeId, query);
            const day = `${i.day}`;
            if (stayPlaceId > -1 && stayPlaceId != placeId) {
              [hh, mm] = visitEndSlot.split(":").map((x) => parseInt(x));
              hh = hh + slot * arrivalToHotelTime;
              const tempDate = arrivalDate.setHours(hh, mm);
              startSlot = new Date(tempDate).toTimeString();
              endSlot = dayEndTime;
              const isSlot = await this.getSlots(endSlot, startSlot, slot);
              if (isSlot) {
                query.startSlotTime = startSlot;
                query.endSlotTime = endSlot;
                console.log("stayyy",stayPlaceId);
                const stayRecommendation = [];
                stayRecommendation.push(
                  await this.getRecommendations(stayPlaceId, query)
                );
                console.log(stayRecommendation);
                for (let key of keys) {
                  //console.log(key);
                  console.log(obj[key]);
                  obj[key].push(stayRecommendation[0][key]);
                }
              }
            }
            allRecommendations[day]=obj;
          }
        } else {//only for arrival once
          placeId = i.action;
          endSlot = dayEndTime;
          if (!i.stay) {
            placeId = i.stayPlaceId;
          }
          stayPlaceId=placeId;
          var aTime = i.arrivalTime;
          [hh, mm] = aTime.split(":").map((x) => parseInt(x));
          hh = hh + slot * hotelCheckInTime + slot * arrivalToHotelTime;
          const tempDate = arrivalDate.setHours(hh, mm);
          startSlot = new Date(tempDate).toTimeString();
          const isSlot = await this.getSlots(endSlot, startSlot, slot);
          if (isSlot) {
            query.startSlotTime = startSlot;
            query.endSlotTime = endSlot;
            // obj.push(await this.getRecommendations(placeId, query));
            obj=await this.getRecommendations(placeId, query);
            console.log(placeId,stayPlaceId);
            const day = `${i.day}`;
            // allRecommendations.push({
            //   [day]: obj,
            // });
            allRecommendations[day]=obj;
          }
        }
      }
      return {
        error: false,
        statusCode: 202,
        allRecommendations,
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
}
module.exports = RecommendationService;

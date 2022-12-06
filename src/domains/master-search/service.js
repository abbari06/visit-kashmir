const PlaceController = require("../places/controller");
const EventController = require("../events/controller");
const FoodPlacesController = require("../food-places/controller");
const RecreationalActivityController = require("../recreational-activities/controller");
const AttractionController = require("../attractions/controller");
class MasterSearchService {
    async search(req){
        try {
            const places = await PlaceController.masterSearch(req);
            const events = await EventController.masterSearch(req);
            const foodPlaces = await FoodPlacesController.masterSearch(req);
            const attractions  = await AttractionController.masterSearch(req);
            const recreationalActivities = await RecreationalActivityController.masterSearch(req);
            return{
                error: false, statusCode: 201,  places, attractions, events, foodPlaces, recreationalActivities
            }
        } catch (error) {
          return { error: true,
            statusCode: 500,
            message: error.errmsg || "Something went wrong",
            errors: error.errors}
        }
    }
}

module.exports = MasterSearchService;
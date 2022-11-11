import mongoose from "mongoose";
import { BaseDataEntity } from "../../base-model";
import autoIncrement from "mongoose-auto-increment";
import extendSchema from "mongoose-extend-schema";

class Event {
  initSchema() {
    const EventSchema = extendSchema(BaseDataEntity, {
        placeId: {
            type: Number,
            required: true,
          },
          attractionId: {
            type: Number,
          },
          foodPlaceId: {
            type: Number,
          },
          name: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          startDate: {
            type: Date,
            required: true,
          },
          endDate: {
            type: Date,
            required: true,
          },
          startingHrs: {
            type: String,
            required: true,
          },
          endingHrs: {
            type: String,
            required: true,
          },
          seniorCetizenCompatibility: Boolean,
          petsAllowed: Boolean,
          restroomAvailability: Boolean,
          modeOfBooking: {
            type: [],
          },
          extras: {
            type: [],
          },
    },{
      timestamps:true
    });
    EventSchema.plugin(autoIncrement.plugin, { model: "events", field: "_id" });
    EventSchema.index({ coordinates: "2dsphere" })
    mongoose.model("events", EventSchema);
  }
  getInstance() {
    this.initSchema();
    return mongoose.model("events");
  }
}
export default Event;
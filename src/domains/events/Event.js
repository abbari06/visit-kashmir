const mongoose = require("mongoose");
const {BaseDataEntity} = require("../../base-model");
const autoIncrement = require("mongoose-auto-increment");
const extendSchema = require("mongoose-extend-schema");
const mongoosePaginate = require("mongoose-paginate-v2");

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
    EventSchema.plugin(mongoosePaginate);
    EventSchema.plugin(autoIncrement.plugin, { model: "events", field: "_id" ,startAt:1});
    EventSchema.index({ coordinates: "2dsphere" })
    mongoose.models.events ||  mongoose.model("events", EventSchema);
  }
  getInstance() {
    this.initSchema();
    return mongoose.model("events");
  }
}

module.exports = Event;
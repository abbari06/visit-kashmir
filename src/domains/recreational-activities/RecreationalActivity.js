const mongoose = require("mongoose");
const {BaseDataEntity} = require("../../base-model");
const autoIncrement = require("mongoose-auto-increment");
const extendSchema = require("mongoose-extend-schema");
const mongoosePaginate = require("mongoose-paginate-v2");

class RecreationalActivity {
  initSchema() {
    const RecreationalActivitySchema = extendSchema(
      BaseDataEntity,
      {
        placeId: {
          type: Number,
          required: true,
        },
        attractionId: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["outdoorActivity", "indoorActivity", "concentsAndShows"],
        },
        modeOfBooking: {
          type: [],
        },
        howToReach: {
          type: String,
        },
        reviewLinks: {
          type: [],
        },
        bestTimeToVisit: {
          type: String,
        },
        mustDo: {
          type: [],
        },
        seniorCitizenCompatibility: {
          type: Boolean,
        },
        petsAllowed: {
          type: Boolean,
        },
      },
      {
        timestamps: true,
      }
    );
    RecreationalActivitySchema.plugin(mongoosePaginate);
    RecreationalActivitySchema.plugin(autoIncrement.plugin, {
      model: "recreationalActivities",
      field: "_id",
    });
    RecreationalActivitySchema.index({ coordinates: "2dsphere" });
    mongoose.model("recreationalActivities", RecreationalActivitySchema);
  }
  getInstance() {
    this.initSchema();
    return mongoose.model("recreationalActivities");
  }
}

module.exports = RecreationalActivity;

const mongoose = require("mongoose");
const {BaseUserSchema} = require("../../base-model");
const autoIncrement = require("mongoose-auto-increment");
const extendSchema = require("mongoose-extend-schema");

class Recommendation {
  initSchema() {
    const RecommendationSchema = extendSchema(
      BaseUserSchema,
      {
        RecommendationBooked: {
          type: Boolean,
        },
        travelBy: {
          type: String,
        },
        arrivalDate: {
          type: Date,
          required:true
        },
        adults: {
          type: Number,
        },
        
        childrens: {
          type: Number,
        },
        totalDaysStay: {
          type: Number,
          required:true
        },
        travelerType: {
          type: String,
        },
        interests: {
          type: [],
        },
        itineryForm: {
          type: [],
        },
      },
      {
        timestamps: true,
      }
    );
    RecommendationSchema.plugin(autoIncrement.plugin, { model: "Recommendations", field: "_id" });
    RecommendationSchema.index({ coordinates: "2dsphere" });
    mongoose.model("Recommendations", RecommendationSchema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("Recommendations");
  }
}

module.exports = Recommendation;
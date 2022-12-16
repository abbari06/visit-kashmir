const mongoose = require("mongoose");
const { BaseUserSchema } = require("../../base-model");
const autoIncrement = require("mongoose-auto-increment");
const extendSchema = require("mongoose-extend-schema");

class Recommendation {
  initSchema() {
    const RecommendationSchema = extendSchema(
      BaseUserSchema,
      {
        userId: {
          type: Number,
          required: true,
        },
        userRecommendations: {
          type: [],
        },
        expiryDate: {
          type: Date,
        },
      },
      {
        timestamps: true,
      }
    );
    RecommendationSchema.plugin(autoIncrement.plugin, {
      model: "Recommendations",
      field: "_id",
    });
    mongoose.model("Recommendations", RecommendationSchema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("Recommendations");
  }
}

module.exports = Recommendation;

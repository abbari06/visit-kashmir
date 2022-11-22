const mongoose = require("mongoose");
const {BaseUserSchema} = require("../../base-model");
const autoIncrement = require("mongoose-auto-increment");
const extendSchema = require("mongoose-extend-schema");

class User {
  initSchema() {
    const UserSchema = extendSchema(
      BaseUserSchema,
      {
        userBooked: {
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
    UserSchema.plugin(autoIncrement.plugin, { model: "users", field: "_id" });
    UserSchema.index({ coordinates: "2dsphere" });
    mongoose.model("users", UserSchema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("users");
  }
}

module.exports = User;
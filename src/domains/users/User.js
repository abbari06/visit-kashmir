import mongoose from "mongoose";
import { BaseUserSchema } from "../../base-model";
import autoIncrement from "mongoose-auto-increment";
import extendSchema from "mongoose-extend-schema";

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

export default User;
const mongoose = require("mongoose");
const { BaseUserSchema } = require("../../base-model");
const autoIncrement = require("mongoose-auto-increment");
const extendSchema = require("mongoose-extend-schema");
const mongoosePaginate = require("mongoose-paginate-v2");

class UserActivities {
  initSchema() {
    const UserActivitiesSchema = extendSchema(
      BaseUserSchema,
      {
        userId: {
          type: Number,
          required: true,
        },
        action: {
          type: String,
        },
        ipaddress: {
          type: String,
        },
        reqData: {
          type: [],
        },
        resData: {
          type: [],
        },
      },
      {
        timestamps: true,
      }
    );
    UserActivitiesSchema.plugin(mongoosePaginate);
    UserActivitiesSchema.plugin(autoIncrement.plugin, {
      model: "UserActivities",
      field: "_id",
    });
    mongoose.models.UserActivities ||
      mongoose.model("UserActivities", UserActivitiesSchema);
  }
  getInstance() {
    this.initSchema();
    return mongoose.model("UserActivities");
  }
}

module.exports = UserActivities;

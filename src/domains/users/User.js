const mongoose = require("mongoose");
const { BaseUserSchema } = require("../../base-model");
const autoIncrement = require("mongoose-auto-increment");
const extendSchema = require("mongoose-extend-schema");
const mongoosePaginate = require("mongoose-paginate-v2");

class User {
  initSchema() {
    const UserShema = extendSchema(
        BaseUserSchema,
      {
        phone: {
          type: Number,
          required: true,
          unique:true
        },
        firstname: {
          type: String,
          trim: true,
          lowercase: true,
        },
        lastname: {
          type: String,
          trim: true,
          lowercase: true,
        },
        email: {
          type: String        },
        lastLoginTime: {
          type: Date,
        },
      },
      {
        timestamps: true,
      }
    );
    UserShema.plugin(mongoosePaginate);
    UserShema.plugin(autoIncrement.plugin, { model: "users", field: "_id" });
    mongoose.models.users || mongoose.model("users", UserShema);
  }
  getInstance() {
    this.initSchema();
    return mongoose.model("users");
  }
}

module.exports = User;

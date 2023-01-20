const mongoose = require("mongoose");
//const {BaseDataEntity} = require("../../base-model");
const autoIncrement = require("mongoose-auto-increment");
//const extendSchema = require("mongoose-extend-schema");


class Plan {
  initSchema() {
    const planSchema = new mongoose.Schema({
      name: {
        type: String,
        enum:["1 day plan","2 days plan","3 days plan","4 days plan","5 days plan","6 days plan","7 days plan","8 days plan","9 days plan","10 days plan"],
        required: true,
      },
      totalDays:Number,
      itineraryForm:{
        type:[]
      },
      deletedFlag: {
        type: Boolean,
        default: false,
      },
    })
    planSchema.plugin(autoIncrement.plugin, { model: "places", field: "_id",startAt:1 });
    mongoose.models.plans || mongoose.model("plans", planSchema); 
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("plans");
  }
}

module.exports = Plan;

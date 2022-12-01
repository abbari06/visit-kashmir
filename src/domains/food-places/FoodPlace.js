const mongoose = require("mongoose");
const {BaseDataEntity} = require("../../base-model");
const autoIncrement = require("mongoose-auto-increment");
const extendSchema = require("mongoose-extend-schema");
const mongoosePaginate = require("mongoose-paginate-v2");

class FoodPlace {
  initSchema() {
    const FoodPlaceShema = extendSchema(BaseDataEntity, {
        placeId: {
            type: Number,
            required: true,
          },
          attractionId: {
            type: Number,
          },
          name: {
            type: String,
            required: true,
          }, 
          type:{
            type:String,
            enum:["stall","restraunt","tea spot"]
          },                                                  
          description: {
            type: String,
            required: true,
          },
          openingHrs: {
            type: String,
            required: true,
          },
          closingHrs: {
            type: String,
            required: true,
          },
          closingDays:{
            type:[String],
            enum:["saturday","sunday"]
          },
          menuLinks:[],
          knownFor:[],
          seniorCetizenCompatibility:{
            type:Boolean
          },
          petsAllowed:{
            type:Boolean
          },
          restroomAvailability:{
            type:Boolean
          },
          pureVeg:{
            type:Boolean
          },
          accomodationAvailability:{
            type:Boolean
          },
          alcoholAvailability:{
            type:Boolean
          },
          averagePrice:{
            type:Number
          },
          averageWaitingTime:{
            type:String
          },
          occupancy:{
            type:Number
          },
          offers:{
            type:[]
          },
          cuisines:{
            type:[]
          },
          modeOfPayment:{
            type:[]
          },
          modeOfBooking: {
            type: [],
          },
          extras: {
            type: [],
          },
    },{
      timestamps:true
    });
    FoodPlaceShema.plugin(mongoosePaginate);
    FoodPlaceShema.plugin(autoIncrement.plugin, { model: "fooodplaces", field: "_id" });
    FoodPlaceShema.index({ coordinates: "2dsphere" })
    mongoose.model("foodplaces", FoodPlaceShema);
  }
  getInstance() {
    this.initSchema();
    return mongoose.model("foodplaces");
  }
}

module.exports = FoodPlace;

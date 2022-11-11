import mongoose from "mongoose";
import { BaseDataEntity } from "../../base-model";
import autoIncrement from "mongoose-auto-increment";
import extendSchema from "mongoose-extend-schema";

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
          type:String,                                                  
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
            type:[]
          },
          menuLinks:[],
          famousFor:[],
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
    FoodPlaceShema.plugin(autoIncrement.plugin, { model: "fooodplaces", field: "_id" });
    FoodPlaceShema.index({ coordinates: "2dsphere" })
    mongoose.model("foodplaces", FoodPlaceShema);
  }
  getInstance() {
    this.initSchema();
    return mongoose.model("foodplaces");
  }
}
export default FoodPlace;

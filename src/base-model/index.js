// import { Schema } from "mongoose";
// import extendSchema from "mongoose-extend-schema";
const {Schema} = require("mongoose");
const extendSchema = require("mongoose-extend-schema");
const categories = require("./categories")
const GeoSchema = new Schema({
  type: {
    enum: ["Point"],
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
  },
});

const BaseUserSchema = new Schema({
  deletedFlag: {
    type: Boolean,
    default: false,
  },
});

const BaseDataEntity = extendSchema(BaseUserSchema, {
  images: [],
  videos: [],
  testimonials: [],
  category:{
    type:[String],
    required:true,
    enum:categories
  },
  rating:Number,
  coordinates: {
    type: GeoSchema,
    required: true,
  },
  distanceFromAirport: Number,
  distanceFromSrinagar:Number
});
module.exports = { BaseUserSchema, BaseDataEntity };

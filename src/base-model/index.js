import { Schema } from "mongoose";
import extendSchema from "mongoose-extend-schema";

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
  coordinates: {
    type: GeoSchema,
    required: true,
  },
  distanceFromAirport: Number,
});
BaseDataEntity.index({ coordinates: "2dsphere" })
module.exports = { BaseUserSchema, BaseDataEntity };

import mongoose from "mongoose";
import { BaseDataEntity } from "../../base-model";
import autoIncrement from "mongoose-auto-increment";
import extendSchema from "mongoose-extend-schema";
import mongoosePaginate from "mongoose-paginate-v2";

class Attraction {
    initSchema() {
      const AttractionSchema = extendSchema(BaseDataEntity, {
        placeId: {
            type: Number,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          knownFor: {
            type: [],
            required: true,
          },
          howToReach: {
            type: String,
          },
          averageTime: {
            type: String,
          },
          extraInfo: {
            type: [],
          },
          restroomAvailability: {
            type: Boolean,
          },
          bestTimeToVisit: {
            type: []
          },
          modeOfBooking: {
            type: []
          },
      },
      {
        timestamps:true
      });
      AttractionSchema.plugin(mongoosePaginate);
      AttractionSchema.plugin(autoIncrement.plugin, { model: "Attraction", field: "_id" });
      AttractionSchema.index({ coordinates: "2dsphere" })
      mongoose.model("Attraction", AttractionSchema);
    }
    getInstance() {
      this.initSchema();
      return mongoose.model("Attraction");
    }
  }
  export default Attraction;
import mongoose from "mongoose";
import { BaseDataEntity } from "../../base-model";
import autoIncrement from "mongoose-auto-increment";
import extendSchema from "mongoose-extend-schema";

class Place {
  initSchema() {
    const PlaceShema = extendSchema(BaseDataEntity, {
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
      thingsToDo: {
        type: [],
        required: true,
      },
      reviewLinks: {
        type: [],
      },
      bestTimeToVisit: {
        type: String,
        required: true,
      },
      mustDo: {
        type: [],
      },
    });
    PlaceShema.plugin(autoIncrement.plugin, { model: "Place", field: "_id" });
    PlaceShema.index({ coordinates: "2dsphere" })
    mongoose.model("places", PlaceShema);
  }
  getInstance() {
    this.initSchema();
    return mongoose.model("places");
  }
}
export default Place;

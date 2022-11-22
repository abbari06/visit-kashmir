const mongoose = require("mongoose");
const {BaseDataEntity} = require("../../base-model");
const autoIncrement = require("mongoose-auto-increment");
const extendSchema = require("mongoose-extend-schema");
const mongoosePaginate = require("mongoose-paginate-v2");

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
    },{
      timestamps:true
    });
    PlaceShema.plugin(mongoosePaginate);
    PlaceShema.plugin(autoIncrement.plugin, { model: "places", field: "_id" });
    PlaceShema.index({ coordinates: "2dsphere" })
    mongoose.model("places", PlaceShema);
  }
  getInstance() {
    this.initSchema();
    return mongoose.model("places");
  }
}

module.exports = Place;

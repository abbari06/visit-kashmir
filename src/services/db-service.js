const PlaceController = require("../domains/places/controller");
const autoBind = require("auto-bind");

class dbService {
  constructor(model) {
    this.model = model;
    autoBind(this);
  }

  async insert(data) {
    try {
      let item = await this.model.create(data);
      if (item) {
        return {
          error: false,
          item,
        };
      }
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error.errmsg || "Not able to create",
        errors: error.errors,
      };
    }
  }

  async list(body) {
    var limit = body.limit || 10;
    var page = body.page || 0;
    const offset = getPagination(page, limit);
    var query = [{ deletedFlag: false }];

    if (body.filter) {
      query = queryBuilder(body.filter);
    }
    let obj = {};
    try {
      obj = await this.model.paginate({ $and: query }, { offset, limit });
      return {
        error: false,
        statusCode: 202,
        data: obj.docs,
        totalDocs: obj.totalDocs,
        offset: obj.offset,
        limit: obj.limit,
        totalPages: obj.totalPages,
        page: obj.page,
        pagingCounter: obj.pagingCounter,
        hasNextPage: obj.hasNextPage,
        hasPrevPage: obj.hasPrevPage,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error.errmsg || "Nothing to show",
        errors: error.errors,
      };
    }
  }
  async update(_id, data) {
    try {
      let item = await this.model.findByIdAndUpdate(_id, data, {
        returnOriginal: false,
      });
      if (item) {
        return {
          statusCode: 200,
          data: item,
        };
      } else {
        return {
          statusCode: 404,
          data: "Not found",
        };
      }
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error.errmsg || "Coundn't update",
        errors: error.errors,
      };
    }
  }

  async getById(_id) {
    let item = await this.model.findById(_id);
    if (item) {
      if (!item.deletedFlag) {
        return {
          error: false,
          statusCode: 201,
          data: item,
        };
      } else {
        return {
          error: true,
          statusCode: 500,
          message: `${item.name} has been deleted.`,
        };
      }
    } else {
      return {
        error: true,
        statusCode: 500,
        message: "Not found",
      };
    }
  }

  async delete(_id) {
    try {
      let item = await this.model.findOne({ _id: _id });
      item.deletedFlag = true;
      item.save();
      return {
        error: false,
        statusCode: 201,
        message: "deleted successfully",
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error.errmsg || "Coundn't delete",
        errors: error.errors,
      };
    }
  }

  async getItemsByPlace(req) {
    const places = await PlaceController.getPlaceByName(req.params);
    const placeIds = [];
    if (places) {
      for (let place of places) {
        placeIds.push(place._id);
      }
    }
    var query = [{ deletedFlag: false }];

    if (req.body.filter) {
      query = queryBuilder(req.body.filter);
    }
    try {
      const item = await this.model
        .find({ $and: query })
        .where("placeId")
        .in(placeIds);
      return {
        error: false,
        statusCode: 202,
        data: item,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error.errmsg || "Something went wrong",
        errors: error.errors,
      };
    }
  }
  async getItemsByAttraction(ids, req) {
    const attractionIds = [];
    if (ids) {
      for (let id of ids) {
        attractionIds.push(id._id);
      }
    }
    var query = [{ deletedFlag: false }];
    if (req.body.filter) {
      query = queryBuilder(req.body.filter);
    }
    try {
      const item = await this.model
        .find({ $and: query })
        .where("attractionId")
        .in(attractionIds);
      return {
        error: false,
        statusCode: 202,
        data: item,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error.errmsg || "Something went wrong",
        errors: error.errors,
      };
    }
  }
  async nearMe(body) {
    try {
      const places = await this.model.find({
        coordinates: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [body.lng, body.lat],
            },
            $maxDistance: 40000,
          },
        },
      });
      return {
        error: false,
        statusCode: 202,
        places,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error.errmsg || "Something went wrong",
        errors: error.errors,
      };
    }
  }
  async recommendation(id, queryy) {
    const query = queryBuilder(queryy, id);
    try {
      return await this.model.find({ $and: query }).sort({rating: -1});
    } catch (error) {
      return {
        message: error.errmsg || "Something went wrong",
      };
    }
  }
  async getTopThree() {
    try {
      const item = await this.model.find().sort({ rating: -1 }).limit(3);
      return { error: false, statusCode: 202, data: item };
    } catch (error) {
      return {
        message: error.errmsg || "Something went wrong",
      };
    }
  }
  async masterSearch(body) {
    let query = [{ deletedFlag: false }];
    if (body.filter) {
      query = queryBuilder(body.filter);
    }
    try {
      const item = await this.model.find({ $and: query });
      if (!item.length == 0) {
        return item;
      }
    } catch (error) {
      return error;
    }
  }
}

const queryBuilder = (data, id) => {
  var query = [
  ];
  if(id!=null){
    query.push({
      placeId: id,
    });
  }
  query.push({
    deletedFlag: false,
  });
  for (const [key, value] of Object.entries(data)) {
    if (key == "famousFor") {
      query.push({
        [key]: { $in: value },
      });
    } else if (key == "startingHrs") {
      query.push({
        [key]: { $gte: value },
      });
    } else if (key == "endingHrs") {
      query.push({
        [key]: { $lte: value },
      });
    } else if (key == "day") {
      query.push({
        closingDays: { $nin: value },
      });
    } else if (key == "name") {
      query.push({
        [key]: { $regex: value },
      });
    } else if (key == "interests") {
      query.push({
        category: { $in: value },
      });
    } else if (key == "departureDate") {
      query.push({
        startDate: { $lte: new Date(value) },
      });
    } else if (key == "arrivalDate") {
      query.push({
        endDate: { $gte: new Date(value) },
      });
    } else if (key == "currentDate") {
      query.push({
        endDate: { $gte: new Date(value) },
        startDate: { $lte: new Date(value) },
      });
    } else if (key == "startSlotTime") {
      query.push({
        endingHrs: { $gte: value },
      });
    } else if (key == "endSlotTime") {
      query.push({
        startingHrs: { $lte: value },
      });
    } else {
      query.push({
        [key]: value,
      });
    }
  }
  console.log(query)
  return query;
};
const getPagination = (page, size) => {
  const offset = page ? page * size : 0;
  return offset;
};

module.exports = dbService;

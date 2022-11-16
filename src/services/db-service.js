class dbService {
  constructor(model) {
    this.model = model;
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
    var sort = body.sort || { updateAt: 1 };
    var query = [{ deletedFlag: false }];

    if (body.filter) {
      query = queryBuilder(body.filter);
    }
    console.log(query);
    try {
      let list = await this.model
        .find({
          $and: query,
        })
        .limit(limit)
        .sort(sort);
      let count = list.length;
      return {
        error: false,
        statusCode: 202,
        list,
        totalElements: count,
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
      return {
        error: false,
        statusCode: 202,
        item,
      };
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
          item,
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
}


const queryBuilder = (data) => {
  var query = [{ deletedFlag: false }];

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
    } else if (key == "name") {
      query.push({
        [key]: { $regex: value },
      });
    } else {
      query.push({
        [key]: value,
      });
    }
  }

  return query;
};

export default dbService;

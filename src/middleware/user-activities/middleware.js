const UserActivities = require("./UserActivities");
const Activities = new UserActivities().getInstance();
var ip = require("ip");
class UserActivitiesMiddleware {
  constructor() {}

  async saveUserReqRes(req, res, next) {
    let response = null;
    const oldJson = res.json;
    res.json = async (body) => {
      res.locals.body = body;
      response = body;
      if (req.body.userId != null) {
        req.body.path = req.route.path;
        await Activities.create({
          ipaddress: ip.address(),
          userId: req.body.userId,
          reqData: [req.body],
          resData: [response],
        });
      }
      return oldJson.call(res, body);
    };
    next();
  }
}

module.exports = new UserActivitiesMiddleware();

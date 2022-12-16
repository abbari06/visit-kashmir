const UserActivities = require("./UserActivities");
const Activities = new UserActivities().getInstance();
class UserActivitiesMiddleware {
  constructor() {}

  async saveUserReqRes(req, res, next) {
    const parseIp = (req) =>
    req.headers['x-forwarded-for']?.split(',').shift()
    || req.socket?.remoteAddress

console.log(parseIp(req))
    let response = null;
    const oldJson = res.json;
    res.json = async (body) => {
      res.locals.body = body;
      response = body;
      if (req.body.userId !=null) {
        console.log(req.body.userId, response)
        const UserActivities = await Activities.findOne({
          userId: req.body.userId,
        });
        if (UserActivities) {
          UserActivities.reqData.push(req.body);
          UserActivities.resData.push(response);
          UserActivities.save();
        } else {
          await Activities.create({
            userId: req.body.userId,
            reqData: [req.body],
            resData: [response],
          });
        }
      }

      return oldJson.call(res, body);
    };
    next();
  }
}

module.exports = new UserActivitiesMiddleware();

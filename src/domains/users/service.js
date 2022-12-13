const dbService = require("../../services/db-service");
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
class UserService extends dbService {
  constructor(model) {
    super(model);
  }
  async registerUser(newUser) {
    await this.model.findOne({ phone: newUser.phone }).then((err, data) => {
      if (err) throw err;
      else if (data != undefined) {
        console.log("user registered");
        return "User already register!";
      } else {
        console.log(" registered");
        return "send"
        // client.verify
        // .services(process.env.TWILIO_SERVICE_ID)
        // .verifications.create({
        //   to: `+${newUser.phone}`,
        //   channel: "sms",
        // })
        // .then((data) => {
        //   return {
        //     message: "Verification is send",
        //     data,
        //   };
        // });
      }
    });
  }
  //  await this.model.findOne({ phone: newUser.phone }, (err, result) => {
  //     if (err) throw err;
  //     console.log(err);
  //     if (result != null) {
  //       return "User is already registered!";
  //     } else {
  //       client.verify
  //         .services(process.env.TWILIO_SERVICE_ID)
  //         .verifications.create({
  //           to: `+${newUser.phone}`,
  //           channel: "sms",
  //         })
  //         .then((data) => {
  //           return {
  //             message: "Verification is send",
  //             data,
  //           };
  //         });
  //     }
  //   });
  //   const user = await this.model.findOne({ phone: newUser.phone });
  //   if (user) {
  //     return "User is already registered";
  //   } else {
  //     client.verify
  //       .services(process.env.TWILIO_SERVICE_ID)
  //       .verifications.create({
  //         to: `+${newUser.phone}`,
  //         channel: "sms",
  //       })
  //       .then((data) => {
  //         return {
  //           message: "Verification is send",
  //           data,
  //         };
  //       });
  //   }
  // }
}
module.exports = UserService;

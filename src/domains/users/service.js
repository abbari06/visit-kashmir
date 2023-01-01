const dbService = require("../../services/db-service");
const jwt = require("jsonwebtoken");
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
class UserService extends dbService {
  constructor(model) {
    super(model);
  }
  async registerUser(newUser) {
    if (newUser.phone) {
      const user = await this.model.findOne({ phone: newUser.phone });
      if (user) {
        return {
          message: "user is already registered!",
          statusCode:403
        };
      } else {
        let response = null;
        await client.verify
          .services(process.env.TWILIO_SERVICE_ID)
          .verifications.create({
            to: `+${newUser.phone}`,
            channel: "sms",
          })
          .then((data) => {
            response = data;
          });
        return {
          message: "Verification code has been sent successfully",
          statusCode:202,
          response,
        };
      }
    } else {
      return {
        error: true,
        message: "Wrong phone number",
      };
    }
  }

  async verifyUser(newUser) {
    let result = null;
    try {
      await client.verify
        .services(process.env.TWILIO_SERVICE_ID)
        .verificationChecks.create({
          to: `+${newUser.phone}`,
          code: newUser.code,
        })
        .then(async (data) => {
          if (data.status === "approved") {
            let user = new this.model({
              phone: newUser.phone,
            });
            let saveUser = await user.save();
            if (saveUser) {
              const token = await this.createAuthToken(saveUser);
              delete saveUser.tokens;
              result = {
                message: "user saved successfully",
                user: saveUser,
                token
              };
            } else {
              result = {
                error: true,
                statusCode: 500,
                message: "Something went wrong!!",
              };
            }
          } else {
            result = {
              error: true,
              statusCode: 400,
              message: "Invalid code!!",
            };
          }
        });
      return result;
    } catch (error) {
      return (result = {
        statusCode: error.status,
        error: true,
        message: "Not found",
      });
    }
  }

  async loginUser(user) {
    console.log(process.env.TWILIO_SERVICE_ID)
    let User = await this.model.findOne({ phone: user.phone });
    if (!User) {
      return {
        statusCode: 404,
        data: "User not found!!",
      };
    } else {
      let response = null;
      await client.verify
        .services(process.env.TWILIO_SERVICE_ID)
        .verifications.create({
          to: `+${user.phone}`,
          channel: "sms",
        })
        .then((data) => {
          response = data;
        });
      return {
        statusCode: 202,
        message: "Verification code has been sent successfully",
        data: response,
      };
    }
  }

  async loginVerifyUser(user) {
    let result = null;
    try {
      await client.verify
        .services(process.env.TWILIO_SERVICE_ID)
        .verificationChecks.create({
          to: `+${user.phone}`,
          code: user.code,
        })
        .then(async (data) => {
          if (data.status === "approved") {
            let verifiedUser = await this.model.findOne({ phone: user.phone });
            if (verifiedUser) {
              const token = await this.createAuthToken(verifiedUser);
              verifiedUser.lastLoginTime = Date.now();
              verifiedUser.save();
              result = {
                statusCode: 202,
                data: verifiedUser,
                token
              };
            } else {
              result = {
                statusCode: 500,
                data: "Something went wrong please try again!!",
              };
            }
          } else {
            result = {
              error: true,
              statusCode: 400,
              data: "Invalid code!!",
            };
          }
        });
      return result;
    } catch (error) {
      return (result = {
        statusCode: error.status,
        error: true,
        data: "Not found",
      });
    }
  }

  async createAuthToken(user) {
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    let User = await this.model.findOne({ _id: user._id });
    User.tokens = User.tokens.concat({ token });
    await User.save();
    return token;
  }
}

module.exports = UserService;

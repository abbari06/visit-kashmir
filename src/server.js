require('../database');
const express = require("express");
const router = require("./routes");
const UserActivitiesMiddleware = require("./middleware/user-activities/middleware");
const app = express();
app.use(express.json());
app.use(UserActivitiesMiddleware.saveUserReqRes)
app.use(router);
module.exports = app;
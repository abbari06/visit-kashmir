require('../database');
const express = require("express");
const cors = require("cors");
const router = require("./routes");
const UserActivitiesMiddleware = require("./middleware/user-activities/middleware");
const app = express();
app.use(cors())
app.use(express.json());
app.use(UserActivitiesMiddleware.saveUserReqRes)
app.use(router);
module.exports = app;
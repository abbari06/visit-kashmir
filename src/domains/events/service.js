const dbService = require("../../services/db-service");
class EventService extends dbService {
  constructor(model) {
    super(model);
  }
}

module.exports = EventService;

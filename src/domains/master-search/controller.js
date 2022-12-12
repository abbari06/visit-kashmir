const MasterSearchService = require("./service");
const service = new MasterSearchService();
class MasterSearchController {
  constructor(service) {
    // super(service);
    this.search = this.search.bind(this);
  }

  async search(req, res) {
    let response = await service.search(req);
    // if (response.error) return res.status(response.statusCode).send(response);
    // return res.status(201).send(response);
  }
}

module.exports = new MasterSearchController(service);

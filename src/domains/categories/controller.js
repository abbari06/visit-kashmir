const CategoriesService = require("./service");
const service = new CategoriesService()
class CategoriesController {
    constructor(){
        this.get = this.get.bind(this);
    }
  get(req, res) {
    let response = service.listOfCategories();
    if (!response) return res.status(500).send("Something went wrong");
    return res.status(202).send(response);
  }
}

module.exports = new CategoriesController();

const autoBind = require('auto-bind');

class MainController {
  constructor(service) {
    this.service = service;
    autoBind(this);

  }
  async insert(req, res) {
    let response = await this.service.insert(req.body);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(201).send(response);
  }
  async update(req, res) {
    const { id } = req.params;
    let response = await this.service.update(id, req.body);
    return res.status(response.statusCode).send(response);
  }
  async getList(req, res) {
    let response = await this.service.list(req.body);
    return res.status(201).send(response);
  }
  async getById(req, res) {
    const { id } = req.params;
    let response = await this.service.getById(id);
    return res.status(response.statusCode).send(response);
  }
  async delete(req, res) {
    const { id } = req.params;
    let response = await this.service.delete(id);
    return res.status(response.statusCode).send(response);
  }

  async getByPlaceName(req,res){
    let response = await this.service.getItemsByPlace(req);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(201).send(response);
  }
  async getNearPlaces(req,res){
    let response=await this.service.nearMe(req.body);
    if(response.error){
      return res.status(response.statusCode).send(response);
    }
    return res.status(201).send(response);
  }

  async getByAttraction(req,res){
    let response = await this.service.getItemsByAttraction(req);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(201).send(response);
  }

  async getRecommendation(id, query){
    let result = await this.service.recommendation(id, query);
    return result
  }
}

// export default MainController;
module.exports = MainController;

class MainController{
    constructor(service){
        this.service = service;
        this.insert = this.insert.bind(this);
        this.list = this.list.bind(this);
    }

    async insert(req, res) {
        let response = await this.service.insert(req.body);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
      }

    async list(req, res){
        let response = await this.service.getList();
        if(response.error) return res.status(response.statusCode).send(response);
        return res.status(202).send(response);
    }
}

export default MainController
class MainController{
    constructor(service){
        this.service = service;
        this.insert = this.insert.bind(this);
        this.list = this.list.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
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

    async update(req, res){
        const {id} = req.params
        let response = await this.service.update(id,req.body);
        console.log(response);
        return res.status(response.statusCode).send(response);
    }

    async delete(req, res){
        const {id} = req.params
        let response = await this.service.delete(id);
        return res.status(response.statusCode).send(response);
    }
}

export default MainController
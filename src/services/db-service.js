class dbService {
    constructor(model) {
      this.model = model;
    }
  
    async insert(data) {
      try {
        let item = await this.model.create(data);
        if (item) {
          return {
            error: false,
            item,
          };
        }
      } catch (error) {
        return {
          error: true,
          statusCode: 500,
          message: error.errmsg || "Not able to create",
          errors: error.errors,
        };
      }
    }
  
    async getList(query){
      const filters=query.body.filters;
      console.log(filters);
     let  offset=0;
      let limit=1;
      try{ 
        let items = await this.model.paginate({"name":{$regex:query.body.name}},{offset, limit});
        // let item = await this.model.find({$and:[{filters},{"name":{$regex:"n" }},{$and: [{"end_date":{$gte: new Date(new Date(req.body.date).setHours(00, 00, 00))}},{"start_date":{$lte: new Date(new Date(req.body.date).setHours(00, 00, 00))}}, { "place_id": req.body.id }] }]});
        if(items){
          return {
            error:false,
            items
          };
        }
      }catch(error){
        console.log(error);
        return {
          error:true,
          statusCode:500,
          message:error.errmsg || "Nothing to show",
          errors: error.errors
        };
      }
    }

    async update(_id, data){
      try {
        let item = await this.model.findByIdAndUpdate(_id, data,{ returnOriginal: false});
          return {
            error:false,
            statusCode:202,
            item
          };
      } catch (error) {
        return {
          error:true,
          statusCode:500,
          message:error.errmsg || "Coundn't update",
          errors: error.errors
        }
      }
    }

    async delete(_id){
      try {
        let item = await this.model.findOne({_id:_id});
        item.deletedFlag=true;
        item.save();
        return{
          error:false,
          statusCode:201
        }
      } catch (error) {
        return{
          error:true,
          statusCode:500,
          message:error.errmsg || "Coundn't delete",
          errors: error.errors
        }
      
      }
    }
  }
  
  export default dbService;
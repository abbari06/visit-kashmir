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
        console.log("error", error);
        return {
          error: true,
          statusCode: 500,
          message: error.errmsg || "Not able to create",
          errors: error.errors,
        };
      }
    }
  
    async list(query){
      try{ 
        let item = await this.model.find({});
        if(item){
          return {
            error:false,
            item
          };
        }
      }catch(error){
        return {
          error:true,
          statusCode:500,
          message:error.errmsg || "Nothing to show",
          errors: error.errors
        };
      }
    }
  
  }
  
  export default dbService;
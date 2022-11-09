import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

class Connection {
  constructor() {
    const url = process.env.MONGODB_URL;
    console.log('Database is connected')
    mongoose.connect(url);
    autoIncrement.initialize(mongoose.connection);
  }
}

export default new Connection();

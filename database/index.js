const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

class Connection {
  constructor() {
    const url = process.env.MONGODB_URL;
    console.log('Database is connected')
    mongoose.connect(url);
    autoIncrement.initialize(mongoose.connection);
  }
}

module.exports = new Connection();

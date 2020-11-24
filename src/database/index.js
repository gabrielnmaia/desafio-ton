import mongoose from 'mongoose';

class Database {
  constructor() {
    this.mongoConnection = mongoose.connect('mongodb://localhost:27017/tondb', {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();

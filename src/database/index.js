import mongoose from 'mongoose';

class Database {
  constructor() {
    this.mongoConnection = mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();

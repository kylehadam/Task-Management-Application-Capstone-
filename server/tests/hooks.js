import mongoose from 'mongoose';
import Task from '../models/Task.js';
import User from '../models/User.js';

before(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await Task.deleteMany({});
  await User.deleteMany({});
});

after(async () => {
  await mongoose.connection.close();
});

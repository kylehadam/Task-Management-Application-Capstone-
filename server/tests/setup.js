import mongoose from 'mongoose';

before(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

after(async () => {
  await mongoose.connection.dropDatabase(); // Clear test data
  await mongoose.disconnect();
});

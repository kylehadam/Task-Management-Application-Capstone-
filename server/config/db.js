import mongoose from 'mongoose';
import config from './config.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host} [${config.env}]`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

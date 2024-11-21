import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Task from '../models/Task.js';
import config from '../config/config.js';

// Generate JWT Token for testing
export const generateTestToken = (userId, role = 'user') => {
  return jwt.sign({ id: userId, role }, config.jwtSecret, { expiresIn: '1h' });
};

// Create a test user with hashed password
export const createTestUser = async (name, email, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return await User.create({
    name,
    email,
    password: hashedPassword,
  });
};

// Clear all database collections
export const clearDatabase = async () => {
  const collections = Object.keys(User.db.collections);

  for (const collectionName of collections) {
    const collection = User.db.collection(collectionName);
    await collection.deleteMany({});
  }
};

import dotenv from 'dotenv';

dotenv.config();

export const config = {
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
  sessionSecret: process.env.SESSION_SECRET || 'default_session_secret',
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',
};

export default config;

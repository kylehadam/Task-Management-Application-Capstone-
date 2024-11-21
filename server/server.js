import dotenv from 'dotenv';
dotenv.config();
console.log('MongoDB URI:', process.env.MONGO_URI); // Debug log

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import connectDB from './config/db.js';
import config from './config/config.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Session Store
const sessionStore = connectMongo.create({
  mongoUrl: config.mongoURI,
  collectionName: 'sessions',
});

// Express Session Middleware
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: config.env === 'production',
      httpOnly: true,
    },
  })
);

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/analytics', analyticsRoutes);

// Global Error Handler
app.use(errorMiddleware);

// Start Server
if (config.env !== 'test') {
  const PORT = config.port;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;

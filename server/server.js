import dotenv from 'dotenv';
dotenv.config();

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

// Debug Logs (only in non-production environments)
if (config.env !== 'production') {
  console.log('Environment:', config.env);
  console.log('MongoDB URI:', config.mongoURI);
}

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
      secure: config.env === 'production', // HTTPS only in production
      httpOnly: true, // Prevent client-side access to cookies
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
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

// Catch-All Route for Undefined Routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start Server
if (config.env !== 'test') {
  const PORT = config.port || 5000; // Default to 5000 if not provided
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;

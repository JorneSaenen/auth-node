// Importing modules
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';

// variables
const { PORT, FRONTEND_URL, MONGO_URL } = process.env;

// app config
const app = express();
const corsConfig = {
  credentials: true,
  origin: FRONTEND_URL,
};

// middleware
app.use(express.json());
app.use(cors(corsConfig));
app.use(cookieParser());

// routes
app.use('/api/v1/auth', authRoutes);

// start server & connect to database (IIFE)
(async () => {
  try {
    // connect to database
    mongoose.set('strictQuery', true);
    mongoose.connect(MONGO_URL);
    console.log('Succesfully connected to the database');
    // start server
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
})();

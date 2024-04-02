// dependencies
import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './models/user-model';
import authenticateToken from './middlewares/auth';
import authorizeAdmin from './middlewares/authz';
import validateData from './middlewares/validation';
import connectDB from './db';
import { createRoomType, getAllRoomTypes } from './controllers/room-type-controller';
import {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} from './controllers/room-controller';
import Joi from 'joi';

dotenv.config();

// Connect to MongoDB
connectDB();

// Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// JWT secret
const jwtSecret: string = process.env.JWT_SECRET || '';

// Joi validation schema for user registration
const validateUser = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid('guest', 'admin').default('guest'),
});

// JWT token generation
function generateAccessToken(user: any): string {
  return jwt.sign(user, jwtSecret, { expiresIn: '15m' });
}

// Routes
app.post('/api/v1/login', async (req: Request, res: Response) => {
  // Login route
});

app.post('/api/v1/register', validateData(validateUser), async (req: Request, res: Response) => {
  // Register route
});

app.use('/api/v1/room-types', authenticateToken);
app.use('/api/v1/rooms', authenticateToken);

app.post('/api/v1/room-types', authenticateToken, authorizeAdmin, validateData, createRoomType);
app.get('/api/v1/room-types', authenticateToken, getAllRoomTypes);
app.post('/api/v1/rooms', authenticateToken, createRoom);
app.get('/api/v1/rooms', authenticateToken, getAllRooms);
app.get('/api/v1/rooms/:id', authenticateToken, getRoomById);
app.patch('/api/v1/rooms/:id', authenticateToken, updateRoom);
app.delete('/api/v1/rooms/:id', authenticateToken, deleteRoom);

// Define PORT
const PORT: number | string = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
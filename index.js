import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from './controllers/userController.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Get all users
app.get('/api/v1/users', getAllUsers);

// Get user by ID
app.get('/api/v1/users/:id', getUserById);

// Create a new user
app.post('/api/v1/users', createUser);

// Update user by ID
app.put('/api/v1/users/:id', updateUser);

// Delete user by ID
app.delete('/api/v1/users/:id', deleteUser);

// Default 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

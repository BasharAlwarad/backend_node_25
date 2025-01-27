import { Router } from 'express';

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const userRouter = Router();

// Get all users
userRouter.get('/', getAllUsers);

// Get user by ID
userRouter.get('/:id', getUserById);

// Create a new user
userRouter.post('/', createUser);

// Update user by ID
userRouter.put('/:id', updateUser);

// Delete user by ID
userRouter.delete('/:id', deleteUser);

export default userRouter;

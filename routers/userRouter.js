import { Router } from 'express';
import {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { validateUser } from '../validators/userValidator.js';

const userRouter = Router();

// Get all users
userRouter.get('/', getUsers);

// Get user by ID
userRouter.get('/:id', getOneUser);

// Create a new user with validation
userRouter.post('/', validateUser, createUser);

// Update user by ID with validation
userRouter.put('/:id', validateUser, updateUser);

// Delete user by ID
userRouter.delete('/:id', deleteUser);

export default userRouter;

import { Router } from 'express';

import {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const showDate = (req, res, next) => {
  console.log('Date:', new Date());
  next();
};

const userRouter = Router();

// Get all users
// http://localhost:3000/api/v1/users
userRouter.get('/', showDate, getUsers);

// Get user by ID
// http://localhost:3000/api/v1/users/1
userRouter.get('/:id', getOneUser);

// Create a new user
userRouter.post('/', createUser);

// Update user by ID
userRouter.put('/:id', updateUser);

// Delete user by ID
userRouter.delete('/:id', deleteUser);

export default userRouter;

import { Router } from 'express';
import {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  addBookToUser,
  updateBookInUserList,
  deleteBookFromUserList,
} from '../controllers/userController.js';

const userRouter = Router();

// Get all users
userRouter.get('/', getUsers);

// Get user by ID
userRouter.get('/:id', getOneUser);

// Create a new user with validation
userRouter.post('/', createUser);

// Update user by ID with validation
userRouter.put('/:id', updateUser);

// Delete user by ID
userRouter.delete('/:id', deleteUser);

// Add a book to the user's reading list
userRouter.post('/:id/books', addBookToUser);

// Update a book in the user's reading list
userRouter.put('/:id/books/:bookId', updateBookInUserList);

// Delete a book from the user's reading list
userRouter.delete('/:id/books/:bookId', deleteBookFromUserList);

export default userRouter;

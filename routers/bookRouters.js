import { Router } from 'express';
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/bookControllers.js';

const bookRouter = Router();

// Get all books
bookRouter.get('/', getBooks);

// Get book by ID
bookRouter.get('/:id', getBookById);

// Create a new book with validation
bookRouter.post('/', createBook);

// Update book by ID with validation
bookRouter.put('/:id', updateBook);

// Delete book by ID
bookRouter.delete('/:id', deleteBook);

export default bookRouter;

import Book from '../models/Book.js';
import { CustomError } from '../utils/errorHandler.js';
import asyncHandler from '../utils/asyncHandler.js';

// Get All Books (Optionally Filtered by Category ID)
export const getBooks = asyncHandler(async (req, res, next) => {
  const books = await Book.find();
  res.status(200).json({ success: true, data: books });
});

// Get a Single Book by ID
export const getBookById = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new CustomError('Book not found', 404));
  }

  res.status(200).json({ success: true, data: book });
});

// Create a New Book
export const createBook = asyncHandler(async (req, res, next) => {
  const { title, author } = req.body;

  const newBook = new Book({ title, author });
  const savedBook = await newBook.save();

  res.status(201).json({ success: true, data: savedBook });
});

// Update a Book by ID
export const updateBook = asyncHandler(async (req, res, next) => {
  const { title, author, categoryId } = req.body;

  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    { title, author, categoryId },
    { new: true }
  );

  if (!updatedBook) {
    return next(new CustomError('Book not found', 404));
  }

  res.status(200).json({ success: true, data: updatedBook });
});

// Delete a Book by ID
export const deleteBook = asyncHandler(async (req, res, next) => {
  const deletedBook = await Book.findByIdAndDelete(req.params.id);

  if (!deletedBook) {
    return next(new CustomError('Book not found', 404));
  }

  res.status(200).json({ success: true, message: 'Book deleted successfully' });
});

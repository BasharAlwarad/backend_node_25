import User from '../models/User.js';
import Book from '../models/Book.js';
import { CustomError } from '../utils/errorHandler.js';
import asyncHandler from '../utils/asyncHandler.js';

// Fetch All Users (Populating Reading List)
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().populate('readingList.bookRefId');

  res.status(200).json({ success: true, data: users });
});

// Get a Single User (With Reading List)
export const getOneUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate(
    'readingList.bookRefId'
  );

  if (!user) {
    return next(new CustomError('User not found', 404));
  }

  res.status(200).json({ success: true, data: user });
});

// Create a New User
export const createUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, readingList } = req.body;

  const newUser = new User({ firstName, lastName, readingList });
  const savedUser = await newUser.save();

  res.status(201).json({ success: true, data: savedUser });
});

// Update an Existing User (Including Reading List)
export const updateUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, readingList } = req.body;

  if (readingList && readingList.length > 0) {
    for (const item of readingList) {
      const bookExists = await Book.findById(item.bookRefId);
      if (!bookExists) {
        return next(
          new CustomError(`Book with ID ${item.bookRefId} not found`, 404)
        );
      }
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { firstName, lastName, readingList },
    { new: true }
  ).populate('readingList.bookRefId');

  if (!updatedUser) {
    return next(new CustomError('User not found', 404));
  }

  res.status(200).json({ success: true, data: updatedUser });
});

// Delete a User
export const deleteUser = asyncHandler(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);

  if (!deletedUser) {
    return next(new CustomError('User not found', 404));
  }

  res.status(200).json({ success: true, message: 'User deleted successfully' });
});

// Add a Book to User's Reading List
export const addBookToUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { bookRefId, status } = req.body;

  const user = await User.findById(id);
  if (!user) {
    return next(new CustomError('User not found', 404));
  }

  const bookExists = await Book.findById(bookRefId);
  if (!bookExists) {
    return next(new CustomError(`Book with ID ${bookRefId} not found`, 404));
  }

  user.readingList.push({ bookRefId, status });
  await user.save();

  res.status(201).json({ success: true, data: user });
});

// Update a Book in User's Reading List
export const updateBookInUserList = asyncHandler(async (req, res, next) => {
  const { id, bookId } = req.params;
  const { status } = req.body;

  const user = await User.findById(id);
  if (!user) {
    return next(new CustomError('User not found', 404));
  }

  const bookIndex = user.readingList.findIndex(
    (item) => item._id.toString() === bookId
  );

  if (bookIndex === -1) {
    return next(
      new CustomError(
        `Book with ID ${bookId} not found in user's reading list`,
        404
      )
    );
  }

  user.readingList[bookIndex].status = status;
  await user.save();

  res.status(200).json({ success: true, data: user });
});

// Delete a Book from User's Reading List
export const deleteBookFromUserList = asyncHandler(async (req, res, next) => {
  const { id, bookId } = req.params;

  const user = await User.findById(id);
  if (!user) {
    return next(new CustomError('User not found', 404));
  }

  const initialLength = user.readingList.length;
  user.readingList = user.readingList.filter(
    (item) => item._id.toString() !== bookId
  );

  if (user.readingList.length === initialLength) {
    return next(
      new CustomError(
        `Book with ID ${bookId} not found in user's reading list`,
        404
      )
    );
  }

  await user.save();
  res
    .status(200)
    .json({ success: true, message: "Book removed from user's reading list" });
});

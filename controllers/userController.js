import User from '../models/User.js';
import { CustomError } from '../utils/errorHandler.js';
import asyncHandler from '../utils/asyncHandler.js';

// Fetch All Users
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, data: users });
});

// Get a Single User
export const getOneUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    next(new CustomError('User not found', 404));
  }

  res.status(200).json({ success: true, data: user });
});

// Create a New User
export const createUser = asyncHandler(async (req, res, next) => {
  const { first_name, last_name, age } = req.body;

  const newUser = new User({ first_name, last_name, age });
  const savedUser = await newUser.save();
  res.status(201).json({
    success: true,
    data: { id: savedUser._id, first_name, last_name, age },
  });
});

// Update an Existing User
export const updateUser = asyncHandler(async (req, res, next) => {
  const { first_name, last_name, age } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { first_name, last_name, age },
    { new: true }
  );
  if (!updatedUser) {
    next(new CustomError('User not found', 404));
  }
  res.status(200).json({ success: true, data: updatedUser });
});

// Delete a User
export const deleteUser = asyncHandler(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (deletedUser) {
    res
      .status(200)
      .json({ success: true, message: 'User deleted successfully' });
  } else {
    next(new CustomError('User not found', 404));
  }
});

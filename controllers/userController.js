import { db } from '../db.js';
import { ObjectId } from 'mongodb';
import { CustomError } from '../utils/errorHandler.js';
import asyncHandler from '../utils/asyncHandler.js';

// Fetch All Users
export const getUsers = asyncHandler(async (req, res, next) => {
  const userCollection = db.collection('users');
  const users = await userCollection.find().toArray();
  res.status(200).json({ success: true, data: users });
});

// Get a Single User
export const getOneUser = asyncHandler(async (req, res, next) => {
  const userCollection = db.collection('users');
  const user = await userCollection.findOne({
    _id: new ObjectId(req.params.id),
  });

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  res.status(200).json({ success: true, data: user });
});

// Create a New User
export const createUser = asyncHandler(async (req, res, next) => {
  const { first_name, last_name, age } = req.body;
  const userCollection = db.collection('users');

  const result = await userCollection.insertOne({
    first_name,
    last_name,
    age,
  });

  res.status(201).json({
    success: true,
    data: { id: result.insertedId, first_name, last_name, age },
  });
});

// Update an Existing User
export const updateUser = asyncHandler(async (req, res, next) => {
  const { first_name, last_name, age } = req.body;
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    throw new CustomError('Invalid user ID format', 400);
  }

  const userCollection = db.collection('users');
  const user = await userCollection.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  const result = await userCollection.findOneAndUpdate(
    { _id: new ObjectId(userId) },
    { $set: { first_name, last_name, age } },
    { returnDocument: 'after' }
  );

  if (!result.value) {
    throw new CustomError('User not found', 404);
  }

  res.status(200).json({ success: true, data: result.value });
});

// Delete a User
export const deleteUser = asyncHandler(async (req, res, next) => {
  const userCollection = db.collection('users');
  const result = await userCollection.deleteOne({
    _id: new ObjectId(req.params.id),
  });

  if (result.deletedCount === 0) {
    throw new CustomError('User not found', 404);
  }

  res.status(200).json({ success: true, message: 'User deleted successfully' });
});

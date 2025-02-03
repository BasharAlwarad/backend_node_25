import { db } from '../db.js';
import { ObjectId } from 'mongodb';
import { CustomError } from '../utils/errorHandler.js';

// Fetching All Users with Optional Pagination (skip and limit)
export const getUsers = async (req, res, next) => {
  try {
    const userCollection = db.collection('users');
    const users = await userCollection.find().toArray();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    next(new CustomError('Failed to fetch users', 500));
  }
};

// Get a Single User by ID
export const getOneUser = async (req, res, next) => {
  try {
    const userCollection = db.collection('users');
    const user = await userCollection.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(
      new CustomError(
        err.message || 'Failed to fetch user',
        err.statusCode || 500
      )
    );
  }
};

// Create a New User
export const createUser = async (req, res, next) => {
  const { first_name, last_name, age } = req.body;
  try {
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
  } catch (err) {
    next(new CustomError('Failed to create user', 500));
  }
};

// Update an Existing User
export const updateUser = async (req, res, next) => {
  const { first_name, last_name, age } = req.body;
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    return next(new CustomError('Invalid user ID format', 400));
  }

  try {
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
  } catch (err) {
    next(
      new CustomError(
        err.message || 'Failed to update user',
        err.statusCode || 500
      )
    );
  }
};

// Delete a User
export const deleteUser = async (req, res, next) => {
  try {
    const userCollection = db.collection('users');
    const result = await userCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (result.deletedCount === 0) {
      throw new CustomError('User not found', 404);
    }
    res
      .status(200)
      .json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    next(
      new CustomError(
        err.message || 'Failed to delete user',
        err.statusCode || 500
      )
    );
  }
};

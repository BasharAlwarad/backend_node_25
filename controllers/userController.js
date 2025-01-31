import { db } from '../db.js';
import { ObjectId } from 'mongodb';

// Fetching All Users with Optional Pagination (skip and limit)
export const getUsers = async (req, res) => {
  try {
    const userCollection = db.collection('users');
    // const { skip = 0, limit = 10 } = req.query;
    const users = await userCollection
      .find()
      // .skip(parseInt(skip))
      // .limit(parseInt(limit))
      .toArray();

    res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
};

// Get a Single User by ID
export const getOneUser = async (req, res) => {
  try {
    const userCollection = db.collection('users');
    const user = await userCollection.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (user) {
      res.status(200).json({ success: true, data: user });
    } else {
      res.status(404).json({ success: false, error: 'User not found' });
    }
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch user' });
  }
};

// Create a New User
export const createUser = async (req, res) => {
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
    console.error('Error creating user:', err);
    res.status(500).json({ success: false, error: 'Failed to create user' });
  }
};

// Update an Existing User
export const updateUser = async (req, res) => {
  const { first_name, last_name, age } = req.body;
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    return res
      .status(400)
      .json({ success: false, error: 'Invalid user ID format' });
  }

  try {
    const userCollection = db.collection('users');

    const user = await userCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const result = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: { first_name, last_name, age } },
      { returnDocument: 'after' }
    );

    if (result.value) {
      res.status(200).json({ success: true, data: result.value });
    } else {
      res.status(404).json({ success: false, error: 'User not found' });
    }
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ success: false, error: 'Failed to update user' });
  }
};

// Delete a User
export const deleteUser = async (req, res) => {
  try {
    const userCollection = db.collection('users');
    const result = await userCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (result.deletedCount === 1) {
      res
        .status(200)
        .json({ success: true, message: 'User deleted successfully' });
    } else {
      res.status(404).json({ success: false, error: 'User not found' });
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ success: false, error: 'Failed to delete user' });
  }
};

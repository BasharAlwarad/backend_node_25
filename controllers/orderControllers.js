import { db } from '../db.js';
import { ObjectId } from 'mongodb';
import { CustomError } from '../utils/errorHandler.js';
import asyncHandler from '../utils/asyncHandler.js';

// Fetch All Orders
export const getOrders = asyncHandler(async (req, res, next) => {
  const ordersCollection = db.collection('orders');
  const orders = await ordersCollection.find().toArray();
  res.status(200).json({ success: true, data: orders });
});

// Get a Single Order
export const getOneOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    throw new CustomError('Invalid order ID format', 400);
  }

  const ordersCollection = db.collection('orders');
  const order = await ordersCollection.findOne({ _id: new ObjectId(id) });

  if (!order) {
    throw new CustomError('Order not found', 404);
  }

  res.status(200).json({ success: true, data: order });
});

// Create a New Order
export const createOrder = asyncHandler(async (req, res, next) => {
  const { price, date, user_id } = req.body;
  const ordersCollection = db.collection('orders');

  const result = await ordersCollection.insertOne({ price, date, user_id });

  res.status(201).json({
    success: true,
    data: { id: result.insertedId, price, date, user_id },
  });
});

// Update an Existing Order
export const updateOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { price, date, user_id } = req.body;

  if (!ObjectId.isValid(id)) {
    throw new CustomError('Invalid order ID format', 400);
  }

  const ordersCollection = db.collection('orders');
  const order = await ordersCollection.findOne({ _id: new ObjectId(id) });

  if (!order) {
    throw new CustomError('Order not found', 404);
  }

  const result = await ordersCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { price, date, user_id } },
    { returnDocument: 'after' }
  );

  res.status(200).json({ success: true, data: result.value });
});

// Delete an Order
export const deleteOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    throw new CustomError('Invalid order ID format', 400);
  }

  const ordersCollection = db.collection('orders');
  const result = await ordersCollection.deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    throw new CustomError('Order not found', 404);
  }

  res
    .status(200)
    .json({ success: true, message: 'Order deleted successfully' });
});

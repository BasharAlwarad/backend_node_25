import { db } from '../db.js';
import { ObjectId } from 'mongodb';
import { CustomError } from '../utils/errorHandler.js';

export const getOrders = async (req, res, next) => {
  try {
    const ordersCollection = db.collection('orders');
    const orders = await ordersCollection.find().toArray();
    res.json({ success: true, data: orders });
  } catch (error) {
    next(new CustomError('Failed to fetch orders', 500));
  }
};

export const getOneOrder = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return next(new CustomError('Invalid order ID format', 400));
  }
  try {
    const ordersCollection = db.collection('orders');
    const order = await ordersCollection.findOne({ _id: new ObjectId(id) });
    if (!order) {
      return next(new CustomError('Order not found', 404));
    }
    res.json({ success: true, data: order });
  } catch (error) {
    next(new CustomError('Failed to fetch order', 500));
  }
};

export const createOrder = async (req, res, next) => {
  const { price, date, user_id } = req.body;
  try {
    const ordersCollection = db.collection('orders');
    const result = await ordersCollection.insertOne({ price, date, user_id });
    res.status(201).json({
      success: true,
      data: { id: result.insertedId, price, date, user_id },
    });
  } catch (error) {
    next(new CustomError('Failed to create order', 400));
  }
};

export const updateOrder = async (req, res, next) => {
  const { id } = req.params;
  const { price, date, user_id } = req.body;

  if (!ObjectId.isValid(id)) {
    return next(new CustomError('Invalid order ID format', 400));
  }
  try {
    const ordersCollection = db.collection('orders');
    const order = await ordersCollection.findOne({ _id: new ObjectId(id) });
    if (!order) {
      return next(new CustomError('Order not found', 404));
    }
    const result = await ordersCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { price, date, user_id } },
      { returnDocument: 'after' }
    );
    res.json({ success: true, data: result.value });
  } catch (error) {
    next(new CustomError('Failed to update order', 400));
  }
};

export const deleteOrder = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return next(new CustomError('Invalid order ID format', 400));
  }
  try {
    const ordersCollection = db.collection('orders');
    const result = await ordersCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return next(new CustomError('Order not found', 404));
    }
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    next(new CustomError('Failed to delete order', 500));
  }
};

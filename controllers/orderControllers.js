import Order from '../models/Orders.js';
import { CustomError } from '../utils/errorHandler.js';
import asyncHandler from '../utils/asyncHandler.js';

// Fetch All Orders
export const getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json({ success: true, data: orders });
});

// Get a Single Order
export const getOneOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate({
    path: 'user_id',
    model: 'User',
    select: 'first_name last_name',
  });
  if (!order) {
    next(new CustomError('Order not found', 404));
  }
  res.status(200).json({ success: true, data: order });
});

// Create a New Order
export const createOrder = asyncHandler(async (req, res, next) => {
  const { price, user_id } = req.body;

  const newOrder = new Order({ price, user_id });
  const savedOrder = await newOrder.save();
  if (!savedOrder) {
    next(new CustomError('Order not created', 400));
  }
  res.status(201).json({
    success: true,
    data: {
      id: savedOrder._id,
      price: savedOrder.price,
      user_id: savedOrder.user_id,
    },
  });
});

// Update an Existing Order
export const updateOrder = asyncHandler(async (req, res, next) => {
  const { price, user_id } = req.body;
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    { price, user_id },
    { new: true }
  );

  if (!updatedOrder) {
    next(new CustomError('Order not found', 404));
  }

  res.status(200).json({ success: true, data: updatedOrder });
});

// Delete an Order
export const deleteOrder = asyncHandler(async (req, res, next) => {
  const result = await Order.findByIdAndDelete(req.params.id);
  if (result.deletedCount === 0) {
    next(new CustomError('Order not found', 404));
  }
  res
    .status(200)
    .json({ success: true, message: 'Order deleted successfully' });
});

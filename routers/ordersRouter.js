import { Router } from 'express';
import {
  getOrders,
  getOneOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/orderControllers.js';

const ordersRouter = Router();

// Get all orders
ordersRouter.get('/', getOrders);

// Get order by ID
ordersRouter.get('/:id', getOneOrder);

// Create a new order
ordersRouter.post('/', createOrder);

// Update order by ID
ordersRouter.put('/:id', updateOrder);

// Delete order by ID
ordersRouter.delete('/:id', deleteOrder);

export default ordersRouter;

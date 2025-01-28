import { Router } from 'express';
import {
  getOrders,
  getOneOrders,
  createOrders,
  updateOrders,
  deleteOrders,
} from '../controllers/orderControllers.js';

const ordersRouter = Router();

// Get all orders
ordersRouter.get('/', getOrders);

// Get order by ID
ordersRouter.get('/:id', getOneOrders);

// Create a new order
ordersRouter.post('/', createOrders);

// Update order by ID
ordersRouter.put('/:id', updateOrders);

// Delete order by ID
ordersRouter.delete('/:id', deleteOrders);

export default ordersRouter;

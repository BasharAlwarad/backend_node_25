import Orders from '../models/Orders.js';

export const getOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getOneOrders = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Orders.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const createOrders = async (req, res) => {
  const { price, date, user_id } = req.body;
  try {
    const newOrder = await Orders.create({ price, date, user_id });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const updateOrders = async (req, res) => {
  const { id } = req.params;
  const { price, date, user_id } = req.body;

  try {
    const order = await Orders.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.update({ price, date, user_id });
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const deleteOrders = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Orders.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

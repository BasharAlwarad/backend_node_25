import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './db.js';

import userRouter from './routers/userRouter.js';
import ordersRouter from './routers/ordersRouter.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Sync database
(async () => {
  try {
    await sequelize.sync();
    console.log('Database synced.');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// http://localhost:3000/api/v1/users
app.use(`/api/v1/users`, userRouter);

// http://localhost:3000/api/v1/orders
app.use(`/api/v1/orders`, ordersRouter);

// Default 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// http://localhost:3000

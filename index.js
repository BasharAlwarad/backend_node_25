import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './db.js';
import User from './models/User.js';

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

const x = (req, res, next) => {
  console.log(req.method, req.url);
  next();
  // res.send('Hello World');
};

const y = (req, res) => {
  res.json({ message: 'Server is running!' });
};
// Home route
app.get('/', x, y);

const ageCheck = (req, res, next) => {
  if (req.body.age < 18) {
    return res.status(400).json({ error: 'You are not old enough' });
  }
  next();
};

const showDate = (req, res, next) => {
  console.log('Date:', new Date());
  next();
};

app.post(`/testing`, ageCheck, showDate, async (req, res) => {
  const { first_name, last_name, age } = req.body;
  try {
    const newUser = await User.create({ first_name, last_name, age });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// http://localhost:3000/api/v1/users
app.use(`/api/v1/users`, userRouter);

app.use(showDate);
// http://localhost:3000/api/v1/orders
app.use(`/api/v1/orders`, ordersRouter);

// Default 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// http://localhost:3000

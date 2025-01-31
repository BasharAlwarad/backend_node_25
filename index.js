import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { client } from './db.js';

import userRouter from './routers/userRouter.js';
// import ordersRouter from './routers/ordersRouter.js';

config();

const app = express();
app.use(json(), cors());

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('<h1>Server is Running!</h1>');
});

app.use(`/api/v1/users`, userRouter);
// app.use(`/api/v1/orders`, ordersRouter);

app.get('*', (req, res) => {
  res.status(500).send('Server error!');
});

client
  .connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

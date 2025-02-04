import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import './db.js';

import { errorHandler } from './utils/errorHandler.js';
import userRouter from './routers/userRouter.js';
import bookRouter from './routers/bookRouters.js';

config();

const app = express();
app.use(json(), cors());

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('<h1>Server is Running!</h1>');
});

app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/books`, bookRouter);

app.get('*', (req, res) => {
  res.status(500).send('Server error!');
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode at ${PORT}`);
});

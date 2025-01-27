import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routers/userRouter.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.use(`/api/v1/users`, userRouter);

// Default 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

import express from 'express';
import dotenv from 'dotenv';
import queryDB from './db.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Get all users
app.get('/api/v1/users', async (req, res) => {
  const users = await queryDB('SELECT * FROM users');
  res.json(users);
});

// Get user by ID
app.get('/api/v1/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await queryDB('SELECT * FROM users WHERE id = $1', [id]);
  res.json(user[0]);
});

// Create a new user
app.post('/api/v1/users', async (req, res) => {
  const { first_name, last_name, age } = req.body;
  const newUser = await queryDB(
    'INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *',
    [first_name, last_name, age]
  );
  res.status(201).json(newUser[0]);
});

// Update user by ID
app.put('/api/v1/users/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, age } = req.body;

  const updatedUser = await queryDB(
    'UPDATE users SET first_name = $1, last_name = $2, age = $3 WHERE id = $4 RETURNING *',
    [first_name, last_name, age, id]
  );

  res.json(updatedUser[0]);
});

// Delete user by ID
app.delete('/api/v1/users/:id', async (req, res) => {
  const { id } = req.params;

  const deletedUser = await queryDB(
    'DELETE FROM users WHERE id = $1 RETURNING *',
    [id]
  );
  res.json(deletedUser[0]);
});

// Default 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

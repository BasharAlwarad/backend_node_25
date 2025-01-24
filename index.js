import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './db.js';
import User from './models/User.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Sync database
(async () => {
  try {
    await sequelize.sync(); // Ensure the database structure matches the model
    console.log('Database synced.');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Get all users
app.get('/api/v1/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
app.get('/api/v1/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new user
app.post('/api/v1/users', async (req, res) => {
  const { first_name, last_name, age } = req.body;
  try {
    const newUser = await User.create({ first_name, last_name, age });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update user by ID
app.put('/api/v1/users/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, age } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.update({ first_name, last_name, age });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete user by ID
app.delete('/api/v1/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Default 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

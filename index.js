import { createServer } from 'http';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;
const PORT = process.env.PORT || 3000;
const NEON = process.env.NEON;

// Database connection
const pool = new Pool({ connectionString: NEON });

// Query helper
const queryDB = async (query, params = []) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result.rows;
  } finally {
    client.release();
  }
};

// Create server
const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const id = url.pathname.split('/').pop();

  res.setHeader('Content-Type', 'application/json');

  // Home route
  if (req.method === 'GET' && url.pathname === '/') {
    res.end(JSON.stringify({ message: 'Server is running!' }));
    return;
  }

  // Get all users
  if (req.method === 'GET' && url.pathname === '/api/v1/users') {
    const users = await queryDB('SELECT * FROM users');
    res.end(JSON.stringify(users));
    return;
  }

  // Get user by ID
  if (req.method === 'GET' && url.pathname.startsWith('/api/v1/users/')) {
    const user = await queryDB('SELECT * FROM users WHERE id = $1', [id]);
    res.end(JSON.stringify(user[0] || { error: 'User not found' }));
    return;
  }

  // Create a new user
  if (req.method === 'POST' && url.pathname === '/api/v1/users') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      const { first_name, last_name, age } = JSON.parse(body);
      const newUser = await queryDB(
        'INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *',
        [first_name, last_name, age]
      );
      res.end(JSON.stringify(newUser[0]));
    });
    return;
  }

  // Update user by ID
  if (req.method === 'PUT' && url.pathname.startsWith('/api/v1/users/')) {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      try {
        const { first_name, last_name, age } = JSON.parse(body);
        const updatedUser = await queryDB(
          'UPDATE users SET first_name = $1, last_name = $2, age = $3 WHERE id = $4 RETURNING *',
          [first_name, last_name, age, id]
        );
        if (updatedUser.length > 0) {
          res.end(
            JSON.stringify({
              message: 'User updated successfully',
              user: updatedUser[0],
            })
          );
        } else {
          res.end(JSON.stringify({ error: 'User not found' }));
        }
      } catch (err) {
        console.error('Error updating user:', err);
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Failed to update user' }));
      }
    });
    return;
  }

  // Delete user by ID
  if (req.method === 'DELETE' && url.pathname.startsWith('/api/v1/users/')) {
    try {
      const deletedUser = await queryDB(
        'DELETE FROM users WHERE id = $1 RETURNING *',
        [id]
      );
      if (deletedUser.length > 0) {
        res.end(
          JSON.stringify({
            message: 'User deleted successfully',
            user: deletedUser[0],
          })
        );
      } else {
        res.end(JSON.stringify({ error: 'User not found' }));
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Failed to delete user' }));
    }
    return;
  }

  // Default 404 for other routes
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not Found' }));
});

// Start server
server.listen(PORT, () => console.log(`Server running on ${PORT}`));

import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data from the request body
app.use(express.json());

const posts = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
];

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

// GET /posts - Get all posts
app.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

// POST /posts - Add a new post
app.post('/posts', (req, res) => {
  const newPost = req.body;
  posts.push(newPost);
  res.status(201).json(posts);
});

// DELETE /posts/:id - Delete a post by ID
app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  const index = posts.findIndex((post) => post.id === parseInt(id));

  if (index !== -1) {
    posts.splice(index, 1); // Remove the post by ID
    res.status(200).json(posts);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// PUT /posts/:id - Update a post by ID
app.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const updatedPost = req.body;
  const index = posts.findIndex((post) => post.id === parseInt(id));

  if (index !== -1) {
    posts[index] = { id: parseInt(id), ...updatedPost };
    res.status(200).json(posts[index]);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// GET /users - Get all users
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// POST /users - Add a new user
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(users);
});

// DELETE /users/:id - Delete a user by ID
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === parseInt(id));

  if (index !== -1) {
    users.splice(index, 1);
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// PUT /users/:id - Update a user by ID
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  const index = users.findIndex((user) => user.id === parseInt(id));

  if (index !== -1) {
    users[index] = { id: parseInt(id), ...updatedUser };
    res.status(200).json(users[index]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Default handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: 'Page not found',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

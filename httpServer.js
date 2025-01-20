import { createServer } from 'http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const posts = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
];

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

const server = createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && req.url === '/posts') {
    res.statusCode = 200;
    res.end(JSON.stringify(posts));
    return;
  }

  if (req.method === 'POST' && req.url === '/posts') {
    res.statusCode = 201;
    res.end(JSON.stringify({ message: 'data added' }));
    return;
  }

  if (req.method === 'DELETE' && req.url === '/posts') {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'data deleted' }));
    return;
  }

  if (req.method === 'PUT' && req.url === '/posts') {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'data updated' }));
    return;
  }

  if (req.method === 'GET' && req.url === '/users') {
    res.statusCode = 200;
    res.end(JSON.stringify(users));
    return;
  }

  if (req.method === 'POST' && req.url === '/users') {
    res.statusCode = 201;
    res.end(JSON.stringify({ message: 'data added' }));
    return;
  }

  if (req.method === 'DELETE' && req.url === '/users') {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'data deleted' }));
    return;
  }

  if (req.method === 'PUT' && req.url === '/users') {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'data updated' }));
    return;
  }

  res.statusCode = 404;
  res.end(
    JSON.stringify({
      message: req.method === 'GET' ? 'Page not found' : 'Method not allowed',
    })
  );
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

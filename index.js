import http from 'http';
import path from 'path';
import {
  createFileWithMessage,
  deleteFileByName,
  readFileByName,
} from './fileOperations.js';

const requestHandler = async (req, res) => {
  // Regex for file paths in the URL
  const singlePostRegex = /^\/files\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+\.txt$/;

  const { method, url } = req;

  if (url === '/files') {
    if (method === 'POST') {
      let body = '';
      req.on('data', (chunk) => (body += chunk.toString()));
      req.on('end', async () => {
        try {
          const { message } = JSON.parse(body);
          if (!message) throw new Error('Message is required');
          await createFileWithMessage(message);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'File created successfully!' }));
        } catch (error) {
          console.error('Error in POST /files:', error.message);
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: error.message }));
        }
      });
    } else {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Method not allowed' }));
    }
  } else if (singlePostRegex.test(url)) {
    const relativeFilePath = url.split('/').slice(2).join('/');
    const filePath = path.resolve(process.cwd(), relativeFilePath);

    console.log('Resolved file path:', filePath);

    if (method === 'DELETE') {
      try {
        await deleteFileByName(filePath);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'File deleted successfully!' }));
      } catch (error) {
        console.error('Error in DELETE:', error.message);
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message }));
      }
    } else if (method === 'GET') {
      try {
        const content = await readFileByName(filePath);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(content);
      } catch (error) {
        console.error('Error in GET:', error.message);
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message }));
      }
    } else {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Method not allowed' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not found' }));
  }
};

const server = http.createServer(requestHandler);
const port = 3000;

server.listen(port, () =>
  console.log(`Server running at http://localhost:${port}/`)
);

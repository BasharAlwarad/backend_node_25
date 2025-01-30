import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './db.js';
import fileUploader from './middlewares/fileUploader.js';
import multer from 'multer';

import userRouter from './routers/userRouter.js';
import ordersRouter from './routers/ordersRouter.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Setup multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Sync database
(async () => {
  try {
    await sequelize.sync();
    console.log('Database synced.');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// File upload route
// app.post('/api/v1/file-upload', fileUploader.single('image'), (req, res) => {
//   // if (!req.file) throw new ErrorResponse('Please upload a file', 400);
//   return res.status(200).json({
//     location: `${req.protocol}://${req.get('host')}/files/${req.file.filename}`,
//   });
// });

app.post('/api/v1/file-upload', fileUploader.single('image'), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({
        error:
          'File upload failed. Ensure the file is an image and within size limits.',
      });
  }

  return res.status(200).json({
    location: `${req.protocol}://${req.get('host')}/files/${req.file.filename}`,
  });
});

// http://localhost:3000/api/v1/users
app.use(`/api/v1/users`, userRouter);

// http://localhost:3000/api/v1/orders
app.use(`/api/v1/orders`, ordersRouter);

// Default 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

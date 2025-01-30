import { existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filesDirectory = join(__dirname, '../files');
const fileSize = 10 * 1024 * 1024;
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

const fileUploader = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (!existsSync(filesDirectory)) {
        mkdirSync(filesDirectory, { recursive: true });
      }
      cb(null, filesDirectory);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  },
  limits: {
    fileSize,
  },
});

export default fileUploader;

import { access, appendFile, mkdir, unlink, readFile } from 'fs/promises';
import { join, resolve } from 'path';

// Read a file by name
export const readFileByName = async (filePath) => {
  try {
    const absolutePath = resolve(filePath);
    await access(absolutePath);
    const content = await readFile(absolutePath, 'utf-8');
    console.log('File read successfully!');
    return content;
  } catch (error) {
    console.error('Error reading file:', error.message);
    throw new Error('File not found.');
  }
};

export const createDirIfNotExists = async (dirPath) => {
  try {
    await access(dirPath);
  } catch {
    await mkdir(dirPath, { recursive: true });
  }
};

export const createFileWithMessage = async (message) => {
  const now = new Date();
  const dirName = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(now.getDate()).padStart(2, '0')}`;

  const fileName = `${String(now.getHours()).padStart(2, '0')}-${String(
    now.getMinutes()
  ).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}.txt`;

  try {
    await createDirIfNotExists(dirName);
    await appendFile(join(dirName, fileName), `${message}\n`);
    console.log('File created successfully!');
  } catch (error) {
    console.error('Error creating file:', error.message);
  }
};

export const deleteFileByName = async (filePath) => {
  try {
    const absolutePath = resolve(filePath);
    await access(absolutePath);
    await unlink(absolutePath);
    console.log('File deleted successfully!');
  } catch {
    console.log('File not found.');
  }
};

// Terminal execution
const command = process.argv[2];
const argument = process.argv[3];

if (command === 'create' && argument) {
  createFileWithMessage(argument);
} else if (command === 'delete' && argument) {
  deleteFileByName(argument);
} else {
  console.log('Usage: create <message> | delete <filePath>');
}

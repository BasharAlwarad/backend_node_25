import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_NAME = process.env.MONGODB_NAME;
const client = new MongoClient(MONGODB_URI);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('MongoDB is connected...');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
}

connectToDatabase();

const db = client.db(MONGODB_NAME);
export { db, client };

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB is connected...');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
}

connectToDatabase();

export { mongoose };

// import { MongoClient } from 'mongodb';
// import dotenv from 'dotenv';

// dotenv.config();

// const MONGODB_URI = process.env.MONGODB_URI;
// const MONGODB_NAME = process.env.MONGODB_NAME;
// const client = new MongoClient(MONGODB_URI);

// async function connectToDatabase() {
//   try {
//     await client.connect();
//     console.log('MongoDB is connected...');
//   } catch (err) {
//     console.error('Unable to connect to the database:', err);
//     process.exit(1);
//   }
// }

// connectToDatabase();

// const db = client.db(MONGODB_NAME);
// export { db, client };

// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();

// const NEON = process.env.NEON;

// // Initialize Sequelize
// export const sequelize = new Sequelize(NEON, {
//   dialect: 'postgres',
//   logging: false,
// });

// // Test the connection
// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Database connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// })();

// export const db = async () => {
//   try {
//     await sequelize.sync();
//     console.log('Database synced.');
//   } catch (error) {
//     console.error('Error syncing database:', error);
//   }
// };

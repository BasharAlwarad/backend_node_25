import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const NEON = process.env.NEON;

// Initialize Sequelize
const sequelize = new Sequelize(NEON, {
  dialect: 'postgres',
  logging: false,
});

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;

import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;
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

export default queryDB;

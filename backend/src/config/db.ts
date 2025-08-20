import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// initializing connection to the SUPABASE

const pool = new Pool({
  connectionString: process.env.SUPABASE,
  ssl: { rejectUnauthorized: false },
});

export default pool;

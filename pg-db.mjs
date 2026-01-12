import 'dotenv/config'
import { Pool } from 'pg'

const pool = new Pool({
   connectionString: process.env.CONNECTION_STRING,
   ssl: {
      rejectUnauthorized: false
   }
});

export const query = (text, values) => pool.query(text, values);
export const getClient = () => pool.connect();
export { pool };

/*
const pool = new Pool({
   user: 'ivaughn',
   password: 'password',
   host: 'localhost',
   port: 5432,
   database: 'spotify_db'
});
*/
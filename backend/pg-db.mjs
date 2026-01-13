import 'dotenv/config'
import { Pool } from 'pg'

console.log('Creating pool with CONNECTION_STRING:', process.env.CONNECTION_STRING ? 'SET' : 'NOT SET');
console.log('First 20 chars:', process.env.CONNECTION_STRING?.substring(0, 20));

const pool = new Pool({
   connectionString: process.env.CONNECTION_STRING,
   ssl: {
      rejectUnauthorized: false
   }
});

console.log('Pool created successfully');

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
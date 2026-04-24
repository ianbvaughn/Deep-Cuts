import 'dotenv/config'
import { Pool } from 'pg'

console.log('Info: CONNECTION_STRING ', process.env.CONNECTION_STRING ? 'SET' : 'NOT SET');
console.log('Info: First 3 chars of CONNECTION_STRING:', process.env.CONNECTION_STRING?.substring(0, 3), '***');

const pool = new Pool({
   connectionString: process.env.CONNECTION_STRING,
   ssl: {
      rejectUnauthorized: false
   }
});

console.log('Info: Pool created successfully');

export { pool };
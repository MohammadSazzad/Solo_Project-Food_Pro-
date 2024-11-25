import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port : process.env.DB_PORT,
    database: process.env.DB_NAME
}).promise();
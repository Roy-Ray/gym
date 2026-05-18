// backend/config/db.js
const mysql = require('mysql2/promise'); // <--- MUST have '/promise'
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'NewStrong@123',
  database: process.env.DB_NAME || 'employeemanagementdb',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // 👇 THIS IS THE FIX FOR AIVEN/RENDER
  ssl: {
    rejectUnauthorized: false
  }
});
module.exports = db;
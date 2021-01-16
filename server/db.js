require('dotenv').config();
const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DB_HOST || 'localhost',
    port            : process.env.DB_PORT || 3306,
    database        : process.env.DB_DATABASE,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD
});

module.exports = pool;
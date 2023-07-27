var mysql = require('mysql');
require('dotenv').config()

// CREATE A CONNECTION
const pool = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// CONNECTION
// kiểm tra kết nối database
pool.connect(function (err) {
    if (err) throw err;
    console.log("Connected Database successful!");
})

module.exports = pool;
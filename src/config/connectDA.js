var mysql = require('mysql');
// require('dotenv').config()

// CREATE A CONNECTION
const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'admin_testappwall'
});

// CONNECTION
// kiểm tra kết nối database
pool.connect(function (err) {
    if (err) throw err;
    console.log("Connected Database successful!");
})

module.exports = pool;
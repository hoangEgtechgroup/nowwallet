const db = require("../config/connectDA");

const login = db.query("SELECT id FROM users WHERE email = ? and username = ? and password = ?");

module.exports = login;
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "NEW_USER_PASSWORD",
    database: "employees"
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
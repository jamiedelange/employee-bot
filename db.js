const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "NEW_USER_PASSWORD",
    database: "employees"
});

connection.connect(function(err) {
    if (err) throw err;
    // console.log("Connected!");
});

/* const x = connection.query("SHOW TABLES", function(err, result, fields) {
    console.log(result)
})
 */

module.exports = connection;
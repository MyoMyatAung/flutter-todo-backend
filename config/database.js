const mysql = require('mysql2');

const db_conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'flutter_todo_database'
});

module.exports = db_conn;
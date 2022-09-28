const mysql = require('mysql2')

require('dotenv').config();

const mysqlConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
})

mysqlConnection.connect(err => {
    if (!err)
        console.log('Connection Succeed')
    else
        console.log('Connection failed \n Error: ' + JSON.stringify(err, undefined, 2))
})

module.exports = mysqlConnection;

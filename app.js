require("dotenv").config();
const express = require('express');
const { Client } = require('pg');
const connectionString = 'postgres://postgres:Finserv@2023@localhost:5432/mydatabase';
//"postgres://YourUserName:YourPassword@localhost:5432/YourDatabase";
const client = new Client({
    connectionString: connectionString
});
client.connect();
var app = express();
// app.set('port', process.env.PORT || 5000);

app.get('/', function (req, res, next) {
    //client.query('SELECT * FROM Employee where id = $1', [1], function (err, result) {
client.query('SELECT * FROM Employee', function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
});
app.listen(process.env.PORT, function () {
    console.log('Server is running.. on Port 3000');
});
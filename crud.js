const express = require('express');
const { Client } = require('pg');
const path = require('path');
var bodyParser = require("body-parser");
const connectionString = 'postgres://postgres:Finserv@2023@localhost:5432/mydatabase';
const client = new Client({
    connectionString: connectionString
});
client.connect();
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 5000);

app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/insert', function (req, res, next) {
    //client.query('SELECT * FROM Employee where id = $1', [1], function (err, result) {
client.query("INSERT into employee values(6,'bhuvan','developer',25,'Pune')", function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send("Inserted successfully");
    });
});

app.get('/delete', function (req, res, next) {
    //client.query('SELECT * FROM Employee where id = $1', [1], function (err, result) {
client.query("DELETE from employee where empid='4'", function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send("Deleted successfully");
    });
});

app.get('/update', function (req, res, next) {
//     //client.query('SELECT * FROM Employee where id = $1', [1], function (err, result) {
// client.query("UPDATE employee set designation='manager' where designation='developer'", function (err, result) {
//         if (err) {
//             console.log(err);
//             res.status(400).send(err);
//         }
//         res.status(200).send("Updated Successfully");
//     });
res.sendFile(path.join(__dirname, '/updateform.html'));
});

app.post('/search', function (req, res) {
    var eid=parseInt(req.body.empidval);
client.query(`SELECT * FROM employee where empid='${eid}'`, function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
});

app.post('/updatedesg', function (req, res) {
    var eid=parseInt(req.body.empidval);
    var desg=req.body.newdesg;
client.query(`UPDATE employee set designation='${desg}' where empid='${eid}'`, function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send("Updated designation");
    });
});

app.get('/show', function (req, res, next) {
client.query("SELECT * FROM employee", function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
});

app.listen(5000, function () {
    console.log('Server is running.. on Port 5000');
});
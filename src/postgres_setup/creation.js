// Imports
const { Client } = require('pg');
const fs = require('fs');

// read in sql setup queries
const sql = fs.readFileSync('person.sql').toString();
const insert = fs.readFileSync('insert.sql').toString();

// read in connection string
const connectionString = fs.readFileSync('credentials.txt').toString();

// connect to heroku database
const client = new Client({
    connectionString: connectionString,
    ssl: true,
});
client.connect();

// query the database
client.query(sql, (err, res) => {
    if (err) throw err;
});

client.query(insert, (err, res) => {
    if (err) throw err;
    client.end();
});

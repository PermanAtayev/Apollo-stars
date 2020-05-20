// Imports
const { Client } = require('pg');
const fs = require('fs');

// read in sql setup queries
const sql = fs.readFileSync('src/postgres_setup/data_loader.sql').toString();

// read in connection string
const connectionString = fs.readFileSync('src/postgres_setup/credentials.txt').toString();

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

return 0;

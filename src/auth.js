// Imports
const { Client } = require('pg');
const fs = require('fs');

// Connect to Heroku Database
const connectionString = fs.readFileSync('postgres_setup/credentials.txt').toString();
const client = new Client({
  connectionString: connectionString,
  ssl: true,
});
client.connect();

// Database Sample Query
client.query("QUERY GOES HERE!", (err, res) => {
    if (err) throw err;
    client.end();
});

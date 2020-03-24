// Imports
const express = require('express');
const fs = require('fs');
const { Client } = require('pg');

// create express app
const app = express();

// connect to local port (app needs to be transitioned from local to heroku)
const port = 3000;

// home router
app.get('/', function(req, res){
    res.send("Apollo Stars");
});
app.listen(port, () => console.log('listening on port ' + port));

// connect to heroku database
const connectionString = fs.readFileSync('postgres_setup/credentials.txt').toString();
const client = new Client({
  connectionString: connectionString,
  ssl: true,
});
client.connect();

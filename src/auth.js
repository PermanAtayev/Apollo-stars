// Imports
const fs = require('fs');
var passport = require('passport');
var request = require('request');
const {Client} = require('pg')
// store passwords in hash
const bcrypt = require('bcrypt')
// generate unique universal ids
const uuidv4 = require('uuid/v4');
const LocalStrategy = require('passport-local').Strategy;

// Connect to Heroku Database
const connectionString = fs.readFileSync('postgres_setup/credentials.txt').toString();
const client = new Client({
  connectionString: connectionString,
  ssl: true,
});
client.connect();

// Register a user

client.query("QUERY GOES HERE!", (err, res) => {
    if (err) throw err;
    client.end();
});

// Log in a user

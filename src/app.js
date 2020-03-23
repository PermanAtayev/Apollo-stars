const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 3000;

app.get('/', function(req, res){
    res.send("Apollo Stars");
});

app.listen(port, () => console.log('listening on port ' + port));
var connectionString = "postgres://dhdhvlgmxspnaa:40d715a84d1d155402c28d586c5e16878c5d956c1d5e6d572759e09a1a4f32f9@ec2-54-247-78-30.eu-west-1.compute.amazonaws.com:5432/d26qd2m1vpnlfq"
const client = new Client({
  connectionString: connectionString,
  ssl: true,
});
client.connect();
const { Client } = require('pg');
var connectionString = "postgres://dhdhvlgmxspnaa:40d715a84d1d155402c28d586c5e16878c5d956c1d5e6d572759e09a1a4f32f9@ec2-54-247-78-30.eu-west-1.compute.amazonaws.com:5432/d26qd2m1vpnlfq"
const client = new Client({
  connectionString: connectionString,
  ssl: true,
});
client.connect();

client.query("QUERY GOES HERE!", (err, res) => {
    if (err) throw err;
    client.end();
});

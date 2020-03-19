const express = require('express');
const app = express();
const port = 3000;

app.get('/', function(req, res){
    res.send("Apollo Stars");
});

app.listen(port, () => console.log('listening on port ' + port));
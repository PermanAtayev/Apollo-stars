const express = require('express');
const app = express();

app.get("/", (req, res) => {
    return res.send("Welcome to stars 2.0");
});

app.use(express.json());

module.exports = app;
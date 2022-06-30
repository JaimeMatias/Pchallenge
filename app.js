const express = require('express')
const app = express()

app.get('/', function (req, res) {
    //console.log(req)
    var ip = req.connection.remoteAddress;


    console.log(ip);
    res.send(`Hello ${ip}`)
})

app.listen(3000)
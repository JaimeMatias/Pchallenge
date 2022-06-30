const express = require('express')
var cors = require('cors')
const app = express()

app.use(cors())// Habilita las peticiones desde multiples origenes

app.get('/', function (req, res) {
    //console.log(req)
    var ip = req.connection.remoteAddress;


    console.log(ip);
    res.send(`Hello ${ip}`)
})

app.listen(3000)
const PORT = 7000
var express = require('express')();
var server = require('http').Server(express);
var io = require("socket.io")(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});


io.on('connection', function (socket) {

    console.log("new client connected");

    socket.on('register-hinban', function (data) {

        console.log('register-hinban', JSON.stringify(data));

        io.emit('register-hinban', data);

    });

});

server.listen(PORT, function () {

    console.log(`socket-server listen at ${PORT}`);

});
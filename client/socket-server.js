var express = require('express')();
var server = require('http').Server(express);
var io = require('socket.io')(server, { origins: '*:*' });
const PORT = 9000

const users = {};

io.on('connection', (socket) => {

    socket.on('online', (data) => {
        if (!users[data]) {
            users[socket.id] = data;
            io.sockets.emit("online", users);
        }
    })

    socket.on('disconnect', () => {
        io.sockets.emit("offline", socket.id);
        delete users[socket.id];
    });

    socket.on('offline', (data) => {
        io.sockets.emit("offline", socket.id);
        delete users[socket.id]
    })

    socket.on('privateMsg', ({ msg, to, data }) => {
        socket.to(to).emit("privateMsg", { msg, from: socket.id, data });
    })

});

server.listen(PORT, function () {
    console.log(`Socket-server listening at ${PORT}`);
});
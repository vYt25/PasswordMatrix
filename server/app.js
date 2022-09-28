const express = require('express')
const port = 5000
const helmet = require('helmet')
const UserController = require('./routes/UserController.js')
const LoginController = require('./routes/LoginController.js')
// const ChatController = require('./routes/ChatController.js')
const PwcController = require('./routes/PwcController.js')

const app = express()
app.use(helmet())

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api/users', UserController)
app.use('/api/login', LoginController)
// app.use('/api/chats', ChatController)
app.use('/api/test', PwcController)

app.listen(port, function () {
    console.log('listening to port ' + port);
})


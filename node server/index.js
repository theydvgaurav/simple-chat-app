//Node server which will handle socket io connections

const express = require('express')
const app = express();
const PORT = process.env.PORT || 8000;
console.clear();

const users = {};

const server = app.listen(PORT, () => { console.log(`Server is running on ${PORT}`) })

const io = require('socket.io')(server, {
  cors: {
    origin: "*"
  },
})

io.on('connection' , socket =>{
    socket.on('new-user-joined', name =>{
        socket.broadcast.emit('user joined', name);
    })
    socket.on('send', (username, message) => {
        socket.broadcast.emit('receive', {message: message, username:username })
    });
})
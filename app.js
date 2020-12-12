const express = require('express');
const socket = require('socket.io');

// Setup Express App
const app = express();

// Static file Middelware
app.use(express.static('public'));

// Listen to Port
const port = process.env.PORT || 3000;
const server = app.listen(port, (req,res)=>{
    console.log('Listening to port ', port);
});

// Setup Socket
const io = socket(server);
// console.log(io);

let users = {};

io.on('connection', (socket)=>{
    console.log(users);
    console.log('Socket connection made ',socket.id);
    
    // Handle Join event
    socket.on('join', (handle)=>{
        users[socket.id]=handle;
        socket.broadcast.emit('join', handle);
    });
    
    // Handle typing event
    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', data);
    });

    // Handle chat event
    socket.on('sendMsg', (data)=>{
        // io.sockets.emit('recieveMsg', data);
        socket.broadcast.emit('recieveMsg', data);
    });

    // Handle leave event
    // socket.on('disconnect', (message)=>{
    //     socket.broadcast.emit('disconnect', users[socket.id]);
    //     delete users[socket.id];
    // });
    
});









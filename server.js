const express = require ('express');
const app = express();
const socket = require('socket.io'); //import socket.io library

const server = app.listen(9000, () => {
    console.log('virtual klinik server is fired up and it has ears to listen for connection at port 9000');
});

app.use(express.static('public'));

const io = socket(server);

io.on('connection', (socket) => {
    console.log('our websocket sever is fired up and is now ready to exchange messages to the front side', socket.id);
});


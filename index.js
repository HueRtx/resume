const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let online = 0;

const settings = {
    template: 'templates',
    port: process.env.PORT || 5000
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + `/${settings.template}/index.html`);
});

io.on('connection', (socket) => {
    online++;
    io.emit('online', online)
    socket.on('disconnect', () => {
        online--;
        io.emit('online', online)
    });
});

server.listen(settings.port, () => {
    console.log(`listening on *:${settings.port}`);
});
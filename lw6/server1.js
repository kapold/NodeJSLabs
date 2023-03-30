const net = require('net');

net.createServer((socket) => {
    console.log(`Client ${socket.remoteAddress}:${socket.remotePort} connected`);
    socket.on('data', (data) => {
        console.log(`Received message from ${socket.remoteAddress}:${socket.remotePort}: ${data}`);
        const response = `ECHO: ${data}`;
        socket.write(response);
    });
    socket.on('end', () => {
        console.log(`Client ${socket.remoteAddress}:${socket.remotePort} disconnected`);
    });
}).listen(3000, () => {
    console.log(`Server listening on port http://localhost:3000`);
});
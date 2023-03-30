const net = require('net');

const PORT1 = 40000;
const PORT2 = 50000;

const server1 = net.createServer((socket) => {
    console.log(`Client ${socket.remoteAddress}:${socket.remotePort} connected to port ${PORT1}`);
    let sum = 0;
    socket.on('data', (data) => {
        const num = data.readInt32BE();
        console.log(`Received number ${num} from client ${socket.remoteAddress}:${socket.remotePort}`);
        sum += num;
    });
    setInterval(() => {
        const subtotal = sum;
        console.log(`Sending subtotal ${subtotal} to client ${socket.remoteAddress}:${socket.remotePort}`);
        socket.write(subtotal.toString());
    }, 5000);
    socket.on('end', () => {
        console.log(`Client ${socket.remoteAddress}:${socket.remotePort} disconnected from port ${PORT1}`);
    });
});

const server2 = net.createServer((socket) => {
    console.log(`Client ${socket.remoteAddress}:${socket.remotePort} connected to port ${PORT2}`);
    let sum = 0;
    socket.on('data', (data) => {
        const num = data.readInt32BE();
        console.log(`Received number ${num} from client ${socket.remoteAddress}:${socket.remotePort}`);
        sum += num;
    });
    setInterval(() => {
        const subtotal = sum;
        console.log(`Sending subtotal ${subtotal} to client ${socket.remoteAddress}:${socket.remotePort}`);
        socket.write(subtotal.toString());
    }, 5000);
    socket.on('end', () => {
        console.log(`Client ${socket.remoteAddress}:${socket.remotePort} disconnected from port ${PORT2}`);
    });
});

server1.listen(PORT1, () => {
    console.log(`Server listening on port ${PORT1}`);
});

server2.listen(PORT2, () => {
    console.log(`Server listening on port ${PORT2}`);
});

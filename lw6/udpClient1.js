const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

socket.on('message', (msg, rinfo) => {
    console.log(`Received message from server: ${msg} (from ${rinfo.address}:${rinfo.port})`);
});

setInterval(() => {
    const message = Buffer.from('Hello, server!');

    socket.send(message, 0, message.length, 4000, 'localhost', (err) => {
        if (err) {
            console.error(`Error sending message to server: ${err}`);
        } else {
            console.log(`Sent message to server: ${message}`);
        }
    });
}, 1000);

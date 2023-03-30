const dgram = require('dgram');

// Create a new UDP socket
const socket = dgram.createSocket('udp4');

// Send a message to the server every second
setInterval(() => {
    const message = Buffer.from('Hello, server!');

    // Send the message to port 4000 on localhost
    socket.send(message, 0, message.length, 4000, 'localhost', (err) => {
        if (err) {
            console.error(`Error sending message to server: ${err}`);
        } else {
            console.log(`Sent message to server: ${message}`);
        }
    });
}, 1000);

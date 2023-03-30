const dgram = require('dgram');

// Create a new UDP socket
const socket = dgram.createSocket('udp4');

// Listen for incoming messages on port 4000
socket.on('message', (message, rinfo) => {
    console.log(`Received message from ${rinfo.address}:${rinfo.port}: ${message}`);

    // Add the "ECHO:" prefix to the message
    const response = Buffer.from(`ECHO: ${message}`);

    // Send the response back to the client
    socket.send(response, 0, response.length, rinfo.port, rinfo.address, (err) => {
        if (err) {
            console.error(`Error sending response to ${rinfo.address}:${rinfo.port}: ${err}`);
        } else {
            console.log(`Sent response to ${rinfo.address}:${rinfo.port}: ${response}`);
        }
    });
});

// Bind the socket to port 4000
socket.bind(4000, () => {
    console.log('UDP server listening on port 4000');
});

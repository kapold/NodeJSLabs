const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

socket.on('message', (message, rinfo) => {
    console.log(`Received message from ${rinfo.address}:${rinfo.port}: ${message}`);

    const response = Buffer.from(`ECHO: ${message}`);

    socket.send(response, 0, response.length, rinfo.port, rinfo.address, (err) => {
        if (err) {
            console.error(`Error sending response to ${rinfo.address}:${rinfo.port}: ${err}`);
        } else {
            console.log(`Sent response to ${rinfo.address}:${rinfo.port}: ${response}`);
        }
    });
});

socket.bind(4000, () => {
    console.log('UDP server listening on port 4000');
});

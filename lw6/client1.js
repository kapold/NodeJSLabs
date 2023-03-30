const net = require('net');

const client = new net.Socket();
const serverAddress = 'localhost';
const serverPort = 3000;

client.connect(serverPort, serverAddress, () => {
    console.log(`Connected to server at ${serverAddress}:${serverPort}`);
    const message = 'Hello, server!';
    console.log(`Sending message to server: ${message}`);
    client.write(message);
});

client.on('data', (data) => {
    console.log(`Received response from server: ${data}`);
    client.destroy();
});

client.on('close', () => {
    console.log('Connection to server closed');
});
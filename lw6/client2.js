const net = require('net');

const serverAddress = 'localhost';
const serverPort = parseInt(process.argv[2]);
const x = parseInt(process.argv[3]);

const client = new net.Socket();
let subtotal = 0;

// node <fileName> <port> <count>

client.connect(serverPort, serverAddress, () => {
    console.log(`Connected to server at ${serverAddress}:${serverPort}`);
    setInterval(() => {
        console.log(`Sending number ${x} to server`);
        client.write(Buffer.alloc(4, x)); // 4-byte buffer for 32-bit number
    }, 1000);
});

client.on('data', (data) => {
    subtotal = parseInt(data);
    console.log(`Received subtotal ${subtotal} from server`);
});

client.on('close', () => {
    console.log('Connection to server closed');
});
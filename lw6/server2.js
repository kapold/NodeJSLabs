const net = require("net");

const PORTS = process.env.PORT || [40000, 50000];
const HOST = process.env.PORT || "127.0.0.1";

let sockets = [];
let servers = [];
net.Socket.prototype.sum = 0;

PORTS.forEach((port) => {
    const server = net.createServer();
    server.listen(port, HOST, () => {
        console.log("New TCP Server is running on port " + port);
    });
    servers.push(server);
});

servers.forEach((server) => {
    server.on("connection", function (sock) {
        let buffer = new Buffer.alloc(4);
        setInterval(() => {
            buffer.writeInt32LE(sock.sum, 0);
            sock.write(buffer);
        }, 5000);

        console.log(
            `Server ${server.address().port} CONNECTED: ${sock.remoteAddress}:${
                sock.remotePort
            }`
        );
        sockets.push(sock);

        sock.on("data", function (data) {
            console.log(
                `DATA ${sock.remoteAddress}:${sock.remotePort} -> ${data.readInt32LE()}`
            );
            sock.sum += data.readInt32LE();
        });

        sock.on("close", function (data) {
            let index = sockets.findIndex(function (o) {
                return (
                    o.remoteAddress === sock.remoteAddress &&
                    o.remotePort === sock.remotePort
                );
            });
            if (index !== -1) sockets.splice(index, 1);
            console.log(`CLOSED: ${sock.remoteAddress}:${sock.remotePort}`);
        });

        sock.on("error", function () {
            console.log("ERROR EMMITED");
        });
    });
});

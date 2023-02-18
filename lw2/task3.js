const http = require("http");


http.createServer((request, response) => {
    if (request.url === '/api/name') {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end("Adamovich Anton Maksimovich")
    }
    else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end("Not found")
    }
}).listen(5000, () => {
    console.log(`Server running on port 5000`);
});

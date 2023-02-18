const http = require("http");
const fs = require("fs");
const path = require("path")


http.createServer((request, response) => {
    if (request.url === '/png') {
        const filePath = path.join(__dirname, 'eren.png');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.end("Error loading index.html: ${err}");
            }
            else {
                response.writeHead(200, {'Content-Type': 'image/png'});
                response.end(data)
            }
        });
    }
    else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end("Not found")
    }
}).listen(5000, () => {
    console.log(`Server running on port 5000`);
});

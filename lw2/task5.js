const http = require("http");
const fs = require("fs");
const path = require("path")


http.createServer((request, response) => {
    if (request.url === '/fetch') {
        const filePath = path.join(__dirname, 'fetch.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.end(`Error loading fetch.html: ${err}`);
            }
            else {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data);
            }
        });
    }
    else if (request.url === '/api/name') {
        const studentName = { lastName: 'Maksimovich', firstName: 'Anton', middleName: 'Adamovich' };
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(studentName));
    }
    else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end("Not found")
    }
}).listen(5000, () => {
    console.log(`Server running on port 5000`);
});

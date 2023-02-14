const http = require("http");

http.createServer((request, response) => {
    response.end("<h1>Hello world</h1>");
}).listen(3000, () => {
    console.log(`Server running on port 3000`);
});
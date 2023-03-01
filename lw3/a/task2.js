const http = require("http");
const url = require("url");

function factorial(x) {
    return x === 0 ? 1 : x * factorial(x - 1)
}

http.createServer((request, response) => {
    const queryObject = url.parse(request.url, true).query;
    const k = parseInt(queryObject.k);

    if (isNaN(k) || k < 0) {
        response.writeHead(400, { 'Content-Type': 'text/plain' });
        response.end('Invalid parameter "k". Please provide a non-negative integer.');
        return;
    }
    const fact = factorial(k);

    const res = {
        k: k,
        fact: fact
    }

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(res));
}).listen(5000, () => {
    console.log(`Server running on port 5000`);
});
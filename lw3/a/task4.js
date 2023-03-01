const http = require("http");
const url = require("url");
const fs = require("fs");

function factorial(n, callback) {
    if (n === 0) {
        process.nextTick(() => callback(1));
    }
    else {
        process.nextTick(() => {
            factorial(n - 1, (result) => {
                callback(n * result);
            });
        });
    }
}

http.createServer((req, res) => {
    if (req.url === "/") {
        fs.readFile("index.html", "utf8", (err, data) => {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.end();
                return;
            }
            res.setHeader("Content-Type", "text/html");
            res.write(data);
            res.end();
        });
    } else if (
        url.parse(req.url, true).pathname === "/fact" &&
        url.parse(req.url, true).query.k !== undefined
    ) {
        const k = parseInt(url.parse(req.url, true).query.k);
        if (isNaN(k) || k < 0) {
            res.statusCode = 400;
            res.end("Invalid input: k must be a non-negative integer");
        }
        factorial(k, (fact) => {
            const message = { k, fact };
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(message));
        });
    } else {
        res.statusCode = 404;
        res.end("Page not found");
    }
}).listen(5000, () => {
    console.log("Server running at http://localhost:5000/");
});

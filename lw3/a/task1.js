const http = require("http");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let state = 'norm';
let possibleStates = ['norm', 'stop', 'test', 'idle']

rl.setPrompt(`Current State: ${state}\nEnter new state (norm, stop, test, idle) or 'exit' to close server:\n`);
rl.prompt();

rl.on('line', (input) => {
    input = input.trim();

    if (input === 'exit') {
        console.log('Exiting from server.');
        process.exit(0);
    }
    else if (possibleStates.includes(input)) {
        state = input;
        console.log(`\nCurrent State: ${state}\nEnter new state (norm, stop, test, idle) or 'exit' to close server:`)
    }
    else {
        console.log(`Invalid command: ${input}`);
    }
});

http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(`<html><body><h1>Current state: ${state}</h1></body></html>`);
    response.end();
}).listen(5000, () => {
    console.log(`Server running on port 5000`);
});
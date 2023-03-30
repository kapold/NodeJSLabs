function square(num) {
    return new Promise((resolve, reject) => {
        if (isNaN(num)) {
            reject('Invalid input: not a number');
        }
        else {
            const timeout = setTimeout(() => {
                reject('Timeout: square function took too long');
            }, 10000);
            const result = num * num;
            setTimeout(() => {
                resolve(result);
            }, 10000);
            clearTimeout(timeout);
        }
    });
}

// Cube function
function cube(num) {
    return new Promise((resolve, reject) => {
        if (isNaN(num)) {
            reject('Invalid input: not a number');
        }
        else {
            const timeout = setTimeout(() => {
                reject('Timeout: cube function took too long');
            }, 5000);
            const result = num * num * num;
            setTimeout(() => {
                resolve(result);
            }, 5000);
            clearTimeout(timeout);
        }
    });
}

function fourthPower(num) {
    return new Promise((resolve, reject) => {
        if (isNaN(num)) {
            reject('Invalid input: not a number');
        }
        else {
            const timeout = setTimeout(() => {
                reject('Timeout: fourthPower function took too long');
            }, 2000);
            const result = num * num * num * num;
            setTimeout(() => {
                resolve(result);
            }, 2000);
            clearTimeout(timeout);
        }
    });
}

const num = 3;
Promise.race([square(num), cube(num), fourthPower(num)])
    .then(value => {
        console.log(`Result: ${value}`);
    })
    .catch(error => {
        console.log(error);
    });

Promise.any([square(num), cube(num), fourthPower(num)])
    .then(value => {
        console.log(`Result: ${value}`);
    })
    .catch(error => {
        console.log(error);
    });

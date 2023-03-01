function square(num) {
    return new Promise((resolve, reject) => {
        if (isNaN(num)) {
            reject('Invalid input: not a number');
        }
        else {
            const result = num * num;
            resolve(result);
        }
    });
}

function cube(num) {
    return new Promise((resolve, reject) => {
        if (isNaN(num)) {
            reject('Invalid input: not a number');
        }
        else {
            const result = num * num * num;
            resolve(result);
        }
    });
}

function fourthPower(num) {
    return new Promise((resolve, reject) => {
        if (isNaN(num)) {
            reject('Invalid input: not a number');
        }
        else {
            const result = num * num * num * num;
            resolve(result);
        }
    });
}

const num = 9;
Promise.all([square(num), cube(num), fourthPower(num)])
    .then(values => {
        console.log(`Square: ${values[0]}, Cube: ${values[1]}, Fourth power: ${values[2]}`);
    })
    .catch(error => {
        console.log(error);
    });
const { v4: uuid } = require('uuid');

function validateCard(cardNumber) {
    console.log(`Card Number: ${cardNumber}`);
    return Math.random() < 0.5;
}

function proceedToPayment(orderNumber) {
    console.log(`Order ID: ${orderNumber}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.5) {
                resolve("Payment successful");
            } else {
                reject("Payment failed");
            }
        }, 2000);
    });
}

function createOrder(cardNumber) {
    return new Promise((resolve, reject) => {
        if (!validateCard(cardNumber)) {
            reject("Card is not valid");
        } else {
            const orderNumber = uuid();
            setTimeout(() => {
                resolve(orderNumber);
            }, 5000);
        }
    });
}

createOrder("1234 5678 9123 456")
    .then((orderNumber) => {
        return proceedToPayment(orderNumber);
    })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });

async function run() {
    try {
        const orderNumber = await createOrder("1234 5678 9123 456");
        const result = await proceedToPayment(orderNumber);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

run();
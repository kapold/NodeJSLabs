function firstJob() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Hello World');
        }, 2000);
    });
}

firstJob()
    .then((result) => {
        console.log("FJ: " + result);
    })
    .catch((error) => {
        console.error(error);
    });

async function run() {
    try {
        const result = await firstJob();
        console.log("Async: " + result);
    } catch (error) {
        console.error(error);
    }
}

run();
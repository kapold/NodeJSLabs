function secondJob() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Error: Promise rejected after 3 seconds.');
        }, 3000);
    });
}

secondJob()
    .then((result) => {
        console.log("FJ: " + result);
    })
    .catch((error) => {
        console.error("FJ: " +  error);
    });

async function run() {
    try {
        const result = await secondJob();
        console.log("Async: " + result);
    } catch (error) {
        console.error("Async: " + error);
    }
}

run();
function thirdJob(data) {
    return new Promise((resolve, reject) => {
        if (isNaN(data)){
            reject('Error');
        }
        else if (data % 2 !== 0) {
            setTimeout(() => {
                resolve('Odd');
            }, 1000);
        }
        else if (data % 2 === 0) {
            setTimeout(() => {
                reject('Even');
            }, 2000);
        }
    });
}

thirdJob(5)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });

async function run() {
    try {
        const result = await thirdJob(4);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

run();
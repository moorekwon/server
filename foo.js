// promise
const promise = new Promise((resolve, reject) => {
    const random = Math.floor(Math.random() * 10);
    setTimeout(() => {
        if (random >= 5) resolve(random);
        // else reject('Error');
        else reject(new Error(random));
    });
});

promise
 .then(res => console.log(res))
 .catch(err => console.log(err));

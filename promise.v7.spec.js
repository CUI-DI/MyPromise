let Promise = require("./promise.v7");

Promise.resolve(
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("OK");
    }, 1000);
  })
).then((data) => {
  console.log(data);
});

let Promise = require("./promise.v4");

let p1 = new Promise((resolve, reject) => {
  resolve("p1 resolved data");
});

let p2 = p1.then((data) => {
  return new Promise((resolve, reject) => {
    resolve("p1 onFulfilled");
  });
});

p2.then((data) => {
  console.log(data, "=> p2 onFulfilled");
});

let fs = require("fs");
let Promise = require("./promise.v3");

// p1.resolve => p1.then.onFulfilled => (p2.resolve 隐藏在then的实现里)  => p2.then.onFulfilled
let p1 = new Promise((resolve, reject) => {
  resolve("p1 resolved data");
});

let p2 = p1.then((data) => {
  return "p1 onFulfilled";
});

p2.then((data) => {
  console.log(data, "=> p2 onFulfilled");
});

let Promise = require("./promise.v2");
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("不成功");
  }, 1000);
});
promise.then(
  (data) => {
    console.log("success1", data);
  },
  (err) => {
    console.log("failed1", err);
  }
);

promise.then(
  (data) => {
    console.log("success2", data);
  },
  (err) => {
    console.log("failed2", err);
  }
);

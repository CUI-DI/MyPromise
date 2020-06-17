let Promise = require("./promise.v1");
let promise = new Promise((resolve, reject) => {
  reject("失败");
});
promise.then(
  (data) => {
    console.log("success", data);
  },
  (err) => {
    console.log("faild", err);
  }
);

let Promise = require("./promise.v5");

let p1 = new Promise((resolve, reject) => {
  resolve("p1 resolved data");
});

p1.then()
  .then()
  .then(
    (data) => {
      console.log(data);
    },
    (err) => {
      console.log(err, "err");
    }
  );

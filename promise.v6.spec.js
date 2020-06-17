let Promise = require("./promise.v6");

new Promise((resolve, reject) => {
  reject("ERROR");
})
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

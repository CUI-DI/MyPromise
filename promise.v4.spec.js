let fs = require("fs");

function read(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

read("./name.txt")
  .then((data) => {
    return read(data);
  })
  .then(
    (data) => {
      console.log("-----success-----", data);
    },
    (err) => {
      console.log("-----error-----", err + "错误");
    }
  );

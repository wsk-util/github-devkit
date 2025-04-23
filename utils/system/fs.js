const fs = require("fs");

function readFile(path) {
  return fs.readFileSync(path, "utf-8");
}

function writeFile(path, content) {
  fs.writeFileSync(path, content);
}

module.exports = {
  readFile,
  writeFile,
};

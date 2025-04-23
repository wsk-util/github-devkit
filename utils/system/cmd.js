const { execSync, exec } = require("child_process");

const cmd = {
  exec: (command) => {
    return execSync(command, { stdio: "inherit" });
  },
  execWithResult: (command) => {
    return execSync(command, { encoding: "utf-8" });
  },
  execAsync: (command) => {
    return exec(command);
  },
};

module.exports = cmd;

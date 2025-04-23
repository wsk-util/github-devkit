const { execSync, exec } = require("child_process");

const cmd = {
  exec: (command) => {
    execSync(command, { stdio: "inherit" });
  },
  execAsync: (command) => {
    return exec(command);
  },
};

module.exports = cmd;

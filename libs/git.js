const cmd = require("../utils/system/cmd");

const git = {
  currentRepo: () => {
    try {
      const url = cmd.exec("git remote get-url origin").trim();
      const repo = url
        .split("/")
        .pop()
        .replace(/\.git$/, "");
      return repo;
    } catch (err) {
      return null;
    }
  },
  clone: (url) => {
    cmd.exec(`git clone ${url}`);
  },

  commitAll: (message) => {
    cmd.exec(`git add .`);
    cmd.exec(`git commit -m "${message}"`);
  },
  push: (branch) => {
    cmd.exec(`git push -u origin ${branch}`);
  },

  checkout: (branch) => {
    cmd.exec(`git checkout ${branch}`);
  },
  checkoutWithNewBranch: (branch, baseBranch) => {
    cmd.exec(`git checkout -b ${branch} ${baseBranch}`);
  },

  fetch: (branch) => {
    cmd.exec(`git fetch origin ${branch}`);
  },
};

module.exports = git;

const cmd = require("../utils/system/cmd");

const git = {  
  currentOwner: () => {
    try {
      const url = cmd.execWithResult("git remote get-url origin").trim();
      // GitHub URL 패턴: https://github.com/owner/repo.git 또는 git@github.com:owner/repo.git
      let owner;
      if (url.includes("github.com/")) {
        // HTTPS 형식
        owner = url.split("github.com/")[1].split("/")[0];
      } else if (url.includes("github.com:")) {
        // SSH 형식
        owner = url.split("github.com:")[1].split("/")[0];
      } else {
        return null;
      }
      return owner;
    } catch (err) {
      return null;
    }
  },  

  currentRepo: () => {
    try {
      const url = cmd.execWithResult("git remote get-url origin").trim();
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

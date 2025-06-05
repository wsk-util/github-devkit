const { Octokit } = require("@octokit/rest");
const env = require("../config/env");

const octokit = {
  instance: null,
  async getInstance() {
    if (this.instance) return this.instance;

    await env.load();
    this.instance = new Octokit({ auth: env.GITHUB_TOKEN });
    return this.instance;
  },
};

module.exports = octokit;

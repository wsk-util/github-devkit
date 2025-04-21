const { Octokit } = require("@octokit/rest");
const dotenv = require("dotenv");

dotenv.config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

module.exports = octokit;

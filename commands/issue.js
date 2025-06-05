const octokit = require("../libs/octokit");
const prompt = require("../utils/prompt");
const env = require("../config/env");
const git = require("../libs/git");

module.exports = async function issue(cmd) {
  if (cmd.create) {
    const github = await octokit.getInstance();

    const username = env.GITHUB_USERNAME;
    const repo = git.currentRepo() || (await prompt.repo()).repo;
    const { issueTitle, issueBody } = await prompt.issue();

    const issue = await github.issues.create({
      owner: username,
      repo,
      title: issueTitle,
      body: issueBody,
    });

    console.log("✅ 이슈 생성 완료:", issue.data.html_url);
  }
};

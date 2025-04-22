const octokit = require("../libs/github");
const { execSync } = require("child_process");
const prompt = require("./prompt");
const env = require("../config/env");

module.exports = async function createIssue() {
  const github = await octokit.getInstance();

  const username = env.GITHUB_USERNAME;
  const repo = getCurrentRepo() || (await prompt.repo()).repo;
  const { issueTitle, issueBody } = await prompt.issue();

  const issue = await github.issues.create({
    owner: username,
    repo,
    title: issueTitle,
    body: issueBody,
  });

  console.log("✅ 이슈 생성 완료:", issue.data.html_url);
};

function getCurrentRepo() {
  try {
    const url = execSync("git remote get-url origin", { encoding: "utf-8" }).trim();
    const repo = url
      .split("/")
      .pop()
      .replace(/\.git$/, "");
    return repo;
  } catch (err) {
    return null;
  }
}

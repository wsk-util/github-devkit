const inquirer = require("inquirer");
const octokit = require("../libs/github");
const dotenv = require("dotenv");

dotenv.config();

module.exports = async function createIssue() {
  const { repo, title, body } = await inquirer.prompt([
    {
      type: "input",
      name: "repo",
      message: "이슈를 발행할 저장소 이름:",
      validate: (input) => input.trim() !== "" || "저장소 이름을 입력해주세요.",
    },
    {
      type: "input",
      name: "title",
      message: "이슈 제목:",
      validate: (input) => input.trim() !== "" || "이슈 제목을 입력해주세요.",
    },
    {
      type: "input",
      name: "body",
      message: "이슈 설명 (선택):",
    },
  ]);

  const owner = process.env.GITHUB_OWNER;

  const issue = await octokit.issues.create({
    owner,
    repo,
    title,
    body,
  });

  console.log("✅ 이슈 생성 완료:", issue.data.html_url);
};

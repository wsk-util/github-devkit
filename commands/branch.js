const inquirer = require("inquirer");
const { execSync } = require("child_process");
const octokit = require("../libs/github");
const dotenv = require("dotenv");

dotenv.config();

module.exports = async function createBranch() {
  const {
    issueNumber,
    prefix = "feat",
    branchName,
    baseBranch = "develop",
  } = await inquirer.prompt([
    // TODO: 이슈 목록 불러와 표시
    {
      type: "input",
      name: "issueNumber",
      message: "이슈 번호:",
      validate: (input) =>
        input.trim() !== "" && /^\d+$/.test(input) ? true : "이슈 번호는 숫자로만 입력해주세요. 예: 123",
    },
    // TODO: 브랜치 구분 자동감지
    {
      type: "input",
      name: "prefix",
      message: "브랜치 구분 (기본값: feat):",
      default: "feat",
    },
    // TODO: 브랜치 이름 자동감지
    {
      type: "input",
      name: "branchName",
      message: "브랜치 이름(예: feature-a, feature-b 등):",
      validate: (input) => input.trim() !== "" || "브랜치 이름을 입력해주세요.",
    },
    {
      type: "input",
      name: "baseBranch",
      message: "어떤 브랜치로부터 분기할까요? (기본값: develop):",
      default: "develop",
    },
  ]);

  // TODO: 레포 확인, 이슈 확인 등 유효성 관련 로직 처리 필요.
  const newBranchName = `${prefix}/${issueNumber}-${branchName}`;

  console.log(`\n📌 브랜치명: ${newBranchName}`);

  // TODO: 브랜치 존재하지 않을 경우 에러 처리
  execSync(`git fetch origin ${baseBranch}`, { stdio: "inherit" });
  execSync(`git checkout -b ${newBranchName} origin/${baseBranch}`, { stdio: "inherit" });
  execSync(`git push -u origin ${newBranchName}`, { stdio: "inherit" });

  console.log("✅ 브랜치 생성 완료!");
};

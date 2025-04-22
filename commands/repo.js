const inquirer = require("inquirer");
const octokit = require("../libs/github");

module.exports = async function createRepo() {
  const { name, description, isPrivate } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "저장소 이름을 입력하세요:",
      validate: (input) => input.trim() !== "" || "저장소 이름을 입력해주세요.",
    },
    {
      type: "input",
      name: "description",
      message: "저장소 설명 (선택):",
    },
    {
      type: "confirm",
      name: "isPrivate",
      message: "저장소를 비공개로 설정할까요?",
      default: true,
    },
  ]);

  // TODO: 계정 or 조직 선택
  const github = await octokit.getInstance();
  const response = await github.repos.createForAuthenticatedUser({
    name,
    description,
    private: isPrivate,
  });

  console.log("\n✅ 저장소 생성 완료!");
  console.log("📦 URL:", response.data.html_url);
};

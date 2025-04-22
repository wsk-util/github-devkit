const { resetLabels } = require("./reset");
const { createLabels } = require("./create");
const labels = require("../../data/labels.json");
const inquirer = require("inquirer");
const dotenv = require("dotenv");

dotenv.config();

module.exports = async function label(cmd) {
  const { repo, selected } = await userPrompt();

  const owner = process.env.GITHUB_OWNER;
  if (cmd.reset) {
    console.log(`🧹 기존 라벨 제거 중...`);
    await resetLabels(owner, repo);
    console.log("🎉 기존 라벨 제거 완료!");
  }

  console.log("🏷️ 라벨 생성 중...");
  await createLabels(owner, repo, selected);
  console.log("🎉 라벨 생성 작업 완료");
};

async function userPrompt() {
  return await inquirer.prompt([
    {
      type: "input",
      name: "repo",
      message: "저장소 이름:",
      validate: (input) => input.trim() !== "" || "저장소 이름을 입력해주세요.",
    },
    {
      type: "checkbox",
      name: "selected",
      message: "생성할 라벨을 선택하세요:",
      choices: labels
        .sort((a, b) => a.order - b.order)
        .map((label) => ({
          name: `${label.name} (${label.description})`,
          value: label,
        })),
    },
  ]);
}

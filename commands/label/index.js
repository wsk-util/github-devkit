const { resetLabels } = require("./reset");
const { createLabels } = require("./create");
const prompt = require("../../utils/prompt");
const git = require("../../libs/git");
const env = require("../../config/env");

module.exports = async function label(cmd) {
  await env.load();
  const repo = git.currentRepo() || (await prompt.repo()).repo;
  const selected = (await prompt.selectLabels()).selected;

  const owner = env.GITHUB_USERNAME;
  if (cmd.reset) {
    console.log(`🧹 기존 라벨 제거 중...`);
    await resetLabels(owner, repo);
    console.log("🎉 기존 라벨 제거 완료!");
  }

  console.log("🏷️ 라벨 생성 중...");
  await createLabels(owner, repo, selected);
  console.log("🎉 라벨 생성 작업 완료");
};

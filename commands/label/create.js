const octokit = require("../../libs/octokit");

module.exports = {
  async createLabels(owner, repo, selected) {
    const github = await octokit.getInstance();
    for (const label of selected) {
      try {
        await github.issues.createLabel({
          owner,
          repo,
          name: label.name,
          color: label.color,
          description: label.description,
        });
        console.log(`✅ 라벨 생성됨: ${label.name}`);
      } catch (e) {
        if (e.status === 422) {
          console.log(`⚠️ 라벨이 이미 존재합니다: ${label.name}`);
        } else {
          console.error(`❌ 라벨 생성 실패: ${label.name}`, e.message);
        }
      }
    }
  },
};

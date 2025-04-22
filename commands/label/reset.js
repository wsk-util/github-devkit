const octokit = require("../../libs/github");

module.exports = {
  async resetLabels(owner, repo) {
    const github = await octokit.getInstance();
    const existingLabels = await github.issues.listLabelsForRepo({ owner, repo });
    for (const label of existingLabels.data) {
      try {
        await github.issues.deleteLabel({ owner, repo, name: label.name });
        console.log(`❌ 삭제됨: ${label.name}`);
      } catch (e) {
        console.error(`삭제 실패: ${label.name}`, e.message);
      }
    }
  },
};

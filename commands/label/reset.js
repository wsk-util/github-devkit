const octokit = require("../../libs/github");
const labels = require("../../data/labels.json");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  async resetLabels(owner, repo) {
    const existingLabels = await octokit.issues.listLabelsForRepo({ owner, repo });
    for (const label of existingLabels.data) {
      try {
        await octokit.issues.deleteLabel({ owner, repo, name: label.name });
        console.log(`❌ 삭제됨: ${label.name}`);
      } catch (e) {
        console.error(`삭제 실패: ${label.name}`, e.message);
      }
    }
  },
};

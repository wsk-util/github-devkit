const git = require("../libs/git");
const prompt = require("../utils/prompt");

module.exports = async function branch(cmd) {
  if (cmd.create) {
    const { issueNumber, prefix, branchName, baseBranch } = await prompt.createBranch();

    // TODO: 레포 확인, 이슈 확인 등 유효성 관련 로직 처리 필요.
    const newBranchName = `${prefix}/${issueNumber}-${branchName}`;

    console.log(`\n📌 브랜치명: ${newBranchName}`);

    // TODO: 브랜치 존재하지 않을 경우 에러 처리
    git.fetch(baseBranch);
    git.checkoutWithNewBranch(newBranchName, `origin/${baseBranch}`);
    git.push(newBranchName);

    console.log("✅ 브랜치 생성 완료!");
  }
};

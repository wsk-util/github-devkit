const octokit = require("../libs/octokit");
const prompt = require("../utils/prompt");
const git = require("../libs/git");

module.exports = async function repo(command) {
  if (command.create) {
    const { name, description, isPrivate } = await prompt.createRepo();

    // TODO: optional -o(조직에 생성)
    const github = await octokit.getInstance();
    const response = await github.repos.createForAuthenticatedUser({
      name,
      description,
      private: isPrivate,
    });

    git.clone(response.data.html_url);
    console.log("\n✅ 저장소 생성 완료!");

    process.chdir(name);
  }
};

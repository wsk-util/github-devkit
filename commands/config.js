const env = require("../config/env");
const octokit = require("../libs/octokit");
const prompt = require("../utils/prompt");

async function configCommand(options) {
  // config 명령어는 토큰이 없어도 실행 가능
  await env.load(false);
  if (options.token) {
    await setGitHubToken();
  } else if (options.show) {
    showCurrentConfig();
  } else {
    await interactiveConfig();
  }
}

async function setGitHubToken() {
  console.log("GitHub Token을 설정합니다. 토큰이 없다면 토큰을 생성해주세요.");
  console.log("토큰은 repo, user 권한이 필요합니다. (https://github.com/settings/tokens/new)");
  console.log("토큰을 입력해주세요.");
  
  const { githubToken } = await prompt.githubToken();
  
  // 토큰 유효성 검증
  try {
    const { Octokit } = require("@octokit/rest");
    const tempOctokit = new Octokit({
      auth: githubToken,
    });
    
    const { data: user } = await tempOctokit.rest.users.getAuthenticated();
    
    env.GITHUB_TOKEN = githubToken;
    env.save();
    
    console.log(`✅ 토큰이 성공적으로 설정되었습니다. (사용자: ${user.login})`);
  } catch (error) {
    console.error("❌ 유효하지 않은 토큰입니다. 다시 확인해주세요.");
    console.error("오류 상세:", error.message);
    if (error.status) {
      console.error("HTTP 상태:", error.status);
    }
    process.exit(1);
  }
}

function showCurrentConfig() {
  const git = require("../libs/git");
  console.log("현재 설정:");
  console.log(`GitHub 토큰: ${env.GITHUB_TOKEN ? "설정됨" : "설정되지 않음"}`);
  console.log(`Git remote owner: ${git.currentOwner() || "Git 저장소가 아니거나 GitHub remote가 없음"}`);
}

async function interactiveConfig() {
  console.log("GitHub DevKit 설정을 진행합니다.");
  
  const inquirer = require("inquirer");
  const { configType } = await inquirer.prompt([
    {
      type: "list",
      name: "configType",
      message: "설정할 항목을 선택하세요:",
      choices: [
        { name: "GitHub 토큰 설정", value: "token" },
        { name: "현재 설정 보기", value: "show" },
        { name: "토큰 재설정", value: "reset" }
      ]
    }
  ]);

  switch (configType) {
    case "token":
      await setGitHubToken();
      break;
    case "show":
      showCurrentConfig();
      break;
    case "reset":
      await resetConfig();
      break;
  }
}

async function resetConfig() {
  const inquirer = require("inquirer");
  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "GitHub 토큰을 초기화하시겠습니까?",
      default: false
    }
  ]);

  if (confirm) {
    env.GITHUB_TOKEN = "";
    env.save();
    console.log("✅ GitHub 토큰이 초기화되었습니다.");
    console.log("파일이 업데이트되었습니다:", require("../utils/system/path").resolveAbsPath("./config/env.json"));
  }
}

module.exports = configCommand;
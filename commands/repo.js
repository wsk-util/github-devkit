const octokit = require("../libs/octokit");
const prompt = require("../utils/prompt");
const git = require("../libs/git");
const env = require("../config/env");
const path = require("path");

module.exports = async function repo(command) {
  if (command.create) {
    await env.getInstance();
    
    const { name, description, isPrivate } = await prompt.createRepo();

    // 저장 경로 확인 및 설정
    const targetPath = await confirmClonePath(name);

    // GitHub 저장소 생성
    const github = await octokit.getInstance();
    const response = await github.repos.createForAuthenticatedUser({
      name,
      description,
      private: isPrivate,
    });

    // 지정된 경로에 클론
    cloneToPath(response.data.html_url, targetPath);
    console.log("\n✅ 저장소 생성 완료!");
    console.log(`📁 저장소 위치: ${targetPath}`);
  }
};

async function confirmClonePath(repoName) {
  const defaultPath = path.join(env.DEFAULT_CLONE_PATH, repoName);
  
  console.log(`\n📁 저장소가 다음 위치에 저장됩니다:`);
  console.log(`   ${defaultPath}`);
  
  const inquirer = require("inquirer");
  const { useDefault } = await inquirer.prompt([
    {
      type: "confirm",
      name: "useDefault",
      message: "이 경로에 저장하시겠습니까?",
      default: true
    }
  ]);

  if (useDefault) {
    return defaultPath;
  }

  const { customPath } = await inquirer.prompt([
    {
      type: "input",
      name: "customPath",
      message: "저장할 경로를 입력하세요 (공백 시 기본 경로):",
      validate: (input) => {
        if (!input.trim()) return true; // 공백 허용 (기본 경로 사용)
        return true;
      },
      filter: (input) => {
        if (!input.trim()) return defaultPath;
        // 상대 경로면 절대 경로로 변환
        return path.isAbsolute(input) ? path.join(input, repoName) : path.join(process.cwd(), input, repoName);
      }
    }
  ]);

  return customPath;
}

function cloneToPath(repoUrl, targetPath) {
  const fs = require("fs");
  const parentDir = path.dirname(targetPath);
  const repoName = path.basename(targetPath);
  
  // 부모 디렉토리가 없으면 생성
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
    console.log(`📁 디렉토리 생성: ${parentDir}`);
  }
  
  // 부모 디렉토리로 이동하여 클론
  const originalCwd = process.cwd();
  
  try {
    process.chdir(parentDir);
    git.clone(repoUrl);
    
    // 클론된 디렉토리로 이동
    process.chdir(repoName);
  } catch (error) {
    process.chdir(originalCwd);
    throw error;
  }
}

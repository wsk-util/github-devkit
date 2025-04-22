const inquirer = require("inquirer");

const prompt = {
  username: async () => {
    return await inquirer.prompt([
      {
        type: "input",
        name: "username",
        message: "사용자 이름:",
        validate: (input) => input.trim() !== "" || "사용자 이름을 입력해주세요.",
      },
    ]);
  },
  repo: async () => {
    return await inquirer.prompt([
      {
        type: "input",
        name: "repo",
        message: "저장소 이름:",
        validate: (input) => input.trim() !== "" || "저장소 이름을 입력해주세요.",
      },
    ]);
  },
  issue: async () => {
    return await inquirer.prompt([
      {
        type: "input",
        name: "issueTitle",
        message: "이슈 제목:",
        validate: (input) => input.trim() !== "" || "이슈 제목을 입력해주세요.",
      },
      {
        type: "input",
        name: "issueBody",
        message: "이슈 설명 (선택):",
      },
    ]);
  },
  githubToken: async () => {
    return await inquirer.prompt([
      {
        type: "input",
        name: "githubToken",
        message: "GitHub 토큰:",
        validate: (input) => input.trim() !== "" || "토큰 문자열을 입력해주세요.",
      },
    ]);
  },
  githubUsername: async () => {
    return await inquirer.prompt([
      {
        type: "input",
        name: "githubUsername",
        message: "GitHub 사용자명:",
        validate: (input) => input.trim() !== "" || "사용자명을 입력해주세요.",
      },
    ]);
  },
};

module.exports = prompt;

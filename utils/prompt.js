const inquirer = require("inquirer");
const labels = require("../data/labels.json");

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
  createRepo: async () => {
    return await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "저장소 이름:",
        validate: (input) => input.trim() !== "" || "저장소 이름을 입력해주세요.",
      },
      {
        type: "input",
        name: "description",
        message: "저장소 설명 (선택):",
      },
      {
        type: "confirm",
        name: "isPrivate",
        message: "저장소를 공개로 설정할까요? (기본값: true)",
        default: true,
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
  selectLabels: async () => {
    return await inquirer.prompt([
      {
        type: "checkbox",
        name: "selected",
        message: "생성할 라벨을 선택하세요:",
        choices: labels
          .sort((a, b) => a.order - b.order)
          .map((label) => ({
            name: `${label.name} (${label.description})`,
            value: label,
            checked: label.default === true,
          })),
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
  createBranch: async () => {
    return await inquirer.prompt([
      // TODO: 이슈 목록 불러와 표시
      {
        type: "input",
        name: "issueNumber",
        message: "이슈 번호:",
        validate: (input) =>
          input.trim() !== "" && /^\d+$/.test(input) ? true : "이슈 번호는 숫자로만 입력해주세요. 예: 123",
      },
      // TODO: 브랜치 구분 자동감지
      {
        type: "input",
        name: "prefix",
        message: "브랜치 구분 (기본값: feat):",
        default: "feat",
      },
      // TODO: 브랜치 이름 자동감지
      {
        type: "input",
        name: "branchName",
        message: "브랜치 이름(예: auth, user, ..):",
        validate: (input) => input.trim() !== "" || "브랜치 이름을 입력해주세요.",
      },
      {
        type: "input",
        name: "baseBranch",
        message: "어떤 브랜치로부터 분기할까요? (기본값: develop):",
        default: "develop",
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

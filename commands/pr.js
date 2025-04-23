const inquirer = require("inquirer");
const octokit = require("../libs/octokit");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

module.exports = async function createPullRequest() {
  await env.load();

  const { branch, title, template, customBody } = await inquirer.prompt([
    {
      type: "list",
      name: "branch",
      message: "PR을 생성할 브랜치명을 선택하세요:",
      choices: getLocalBranches(),
    },
    {
      type: "input",
      name: "title",
      message: "PR 제목:",
      validate: (input) => input.trim() !== "" || "제목을 입력해주세요.",
    },
    {
      type: "list",
      name: "template",
      message: "사용할 PR 템플릿을 선택하세요:",
      choices: getTemplates(),
    },
    {
      type: "editor",
      name: "customBody",
      message: "내용을 편집하세요 (기본값은 템플릿 내용입니다)",
      when: (answers) => !!answers.template,
      default: (answers) => loadTemplate(answers.template),
    },
  ]);

  // 브랜치명에서 이슈 번호 추출
  const issueMatch = branch.match(/\/(\d+)-/);
  const issueNumber = issueMatch ? issueMatch[1] : null;

  const prBody = customBody || (issueNumber ? `Fixes #${issueNumber}` : "");

  // 커밋 (변경사항이 있을 경우)
  try {
    execSync("git add .", { stdio: "inherit" });
    execSync(`git commit -m "${title}"`, { stdio: "inherit" });
  } catch (err) {
    console.log("⚠️ 커밋할 변경사항이 없거나 커밋 생략됨");
  }

  // 푸시
  execSync(`git push -u origin ${branch}`, { stdio: "inherit" });

  // PR 생성
  const pr = await octokit.pulls.create({
    owner: env.GITHUB_OWNER,
    repo,
    head: branch,
    base: "develop",
    title,
    body: prBody,
  });

  console.log("✅ Pull Request 생성 완료:", pr.data.html_url);
};

function getTemplates() {
  const templatesDir = path.join(process.cwd(), ".github", "PULL_REQUEST_TEMPLATE");
  if (!fs.existsSync(templatesDir)) return [];

  return fs
    .readdirSync(templatesDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.parse(file).name);
}

function loadTemplate(name) {
  const filePath = path.join(process.cwd(), ".github", "PULL_REQUEST_TEMPLATE", `${name}.md`);
  if (!fs.existsSync(filePath)) return "";
  return fs.readFileSync(filePath, "utf-8");
}

function getLocalBranches() {
  const output = execSync("git branch --format=%(refname:short)", { encoding: "utf-8" });
  return output
    .split("\n")
    .map((branch) => branch.trim())
    .filter((branch) => branch.length > 0);
}

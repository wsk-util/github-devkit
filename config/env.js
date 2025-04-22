const { readFile, writeFile } = require("../utils/fs");
const { resolveAbsPath } = require("../utils/path");
const prompt = require("../commands/prompt");

const ENV_PATH = resolveAbsPath("./config/env.json");

const env = {
  GITHUB_TOKEN: "",
  GITHUB_USERNAME: "",

  async load() {
    const loaded = JSON.parse(readFile(ENV_PATH));
    this.GITHUB_TOKEN = loaded.GITHUB_TOKEN;
    this.GITHUB_USERNAME = loaded.GITHUB_USERNAME;

    if (!this.GITHUB_TOKEN) {
      console.log("GitHub 토큰이 존재하지 않습니다. 발급받은 토큰을 입력해주세요. (마우스 우클릭)");
      this.GITHUB_TOKEN = (await prompt.githubToken()).githubToken;
    }

    if (!this.GITHUB_USERNAME) {
      console.log("GitHub 사용자명이 존재하지 않습니다. 사용자명을 입력해주세요.");
      this.GITHUB_USERNAME = (await prompt.githubUsername()).githubUsername;
      console.log("입력이 완료되었습니다. 결과를 저장합니다.");
    }

    this.save();
  },

  save() {
    const json = JSON.stringify(
      {
        GITHUB_TOKEN: this.GITHUB_TOKEN,
        GITHUB_USERNAME: this.GITHUB_USERNAME,
      },
      null,
      2
    );
    writeFile(ENV_PATH, json);
  },
};

module.exports = env;

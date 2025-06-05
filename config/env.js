const { readFile, writeFile } = require("../utils/system/fs");
const { resolveAbsPath } = require("../utils/system/path");
const prompt = require("../utils/prompt");
const git = require("../libs/git");

const ENV_PATH = resolveAbsPath("./config/env.json");

const env = {
  GITHUB_TOKEN: "",
  GITHUB_USERNAME: "",
  _loaded: false,

  async load(requireToken = true) {
    if (this._loaded) return this;
    
    this._loaded = true;
    
    try {
      const loaded = JSON.parse(readFile(ENV_PATH));
      this.GITHUB_TOKEN = loaded.GITHUB_TOKEN || "";
    } catch (error) {
      // 파일이 없으면 기본값 사용
      this.GITHUB_TOKEN = "";
    }

    if (!this.GITHUB_TOKEN && requireToken) {
      console.log("GitHub 토큰이 존재하지 않습니다.");
      console.log("다음 명령어로 토큰을 설정해주세요: gdk config -t");
      process.exit(1);
    }

    // 토큰이 있을 때만 git remote에서 owner 정보 추출
    if (this.GITHUB_TOKEN) {
      this.GITHUB_USERNAME = git.currentOwner();
      
      if (!this.GITHUB_USERNAME) {
        console.log("Git remote에서 GitHub owner 정보를 찾을 수 없습니다.");
        console.log("GitHub 저장소에서 실행하거나 owner 정보를 수동으로 입력해주세요.");
        this.GITHUB_USERNAME = (await prompt.githubUsername()).githubUsername;
      }
    }

    return this;
  },

  async getInstance() {
    return await this.load();
  },

  save() {
    const json = JSON.stringify(
      {
        GITHUB_TOKEN: this.GITHUB_TOKEN,
      },
      null,
      2
    );
    writeFile(ENV_PATH, json);
  },
};

module.exports = env;

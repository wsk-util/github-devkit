const { readFile, writeFile } = require("../utils/system/fs");
const { resolveAbsPath } = require("../utils/system/path");
const prompt = require("../utils/prompt");
const git = require("../libs/git");
const fs = require("fs");

const ENV_PATH = resolveAbsPath("./config/env.json");

const env = {
  GITHUB_TOKEN: "",
  GITHUB_USERNAME: "",
  DEFAULT_CLONE_PATH: "",
  _loaded: false,

  async load(requireToken = true) {
    if (this._loaded) return this;
    
    this._loaded = true;
    
    try {
      let loaded = {};
      
      if (fs.existsSync(ENV_PATH)) {
        loaded = JSON.parse(readFile(ENV_PATH));
      }
      
      this.GITHUB_TOKEN = loaded.GITHUB_TOKEN || "";
      this.DEFAULT_CLONE_PATH = loaded.DEFAULT_CLONE_PATH || process.cwd();
    } catch (error) {
      // 파일 파싱 오류 시 기본값 사용
      this.GITHUB_TOKEN = "";
      this.DEFAULT_CLONE_PATH = process.cwd();
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

    // 설정이 변경되었으면 저장 (최초 로딩 시에도 기본값 저장)
    this.save();
    return this;
  },

  async getInstance() {
    return await this.load();
  },

  save() {
    const config = {
      GITHUB_TOKEN: this.GITHUB_TOKEN,
      DEFAULT_CLONE_PATH: this.DEFAULT_CLONE_PATH,
    };

    const jsonContent = JSON.stringify(config, null, 2);
    writeFile(ENV_PATH, jsonContent);
  },
};

module.exports = env;

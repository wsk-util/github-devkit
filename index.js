#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();

program.name("devkit").description("GitHub workflow automation CLI").version("0.1.0");

// command: 테스트
program
  .command("hello")
  .description("(테스트) hello")
  .action(() => {
    console.log("👋 Hello from devkit CLI!");
  });

// command: 저장소 생성
program.command("repo").description("GitHub 저장소 생성").action(require("./commands/repo"));

// command: 라벨 생성
program
  .command("label")
  .description("GitHub 라벨 생성")
  .option("-r, --reset", "기존 라벨 제거 옵션")
  .action(require("./commands/label"));

// command: 이슈 발행
program.command("issue").description("GitHub 이슈 발행").action(require("./commands/issue"));

// command: 브랜치 생성
program.command("branch").description("GitHub 브랜치 생성").action(require("./commands/branch"));

// 커맨드 파싱
program.parse(process.argv);

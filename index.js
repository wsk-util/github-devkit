#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();

program.name("devkit").description("GitHub workflow automation CLI").version("0.1.0");

// 테스트 명령어 (확인용)
program
  .command("hello")
  .description("테스트용 인사 명령어")
  .action(() => {
    console.log("👋 Hello from devkit CLI!");
  });

// 저장소 생성 명령어
program.command("repo").description("GitHub 저장소 생성").action(require("./commands/repo"));

// 커맨드 파싱
program.parse(process.argv);

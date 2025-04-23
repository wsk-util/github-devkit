#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();

program.name("devkit").description("GitHub workflow automation CLI").version("0.1.0");

// command: 저장소 관리
program
  .command("repo")
  .description("GitHub 저장소 관리")
  .option("-c, --create", "(옵션) 새로운 저장소 생성")
  .action(require("./commands/repo"));

// command: 라벨 관리
program
  .command("label")
  .description("GitHub 라벨 관리")
  .option("-c, --create", "(옵션) 라벨 목록 생성")
  .option("-r, --reset", "(옵션) 기존 라벨 제거")
  .action(require("./commands/label"));

// command: 이슈 관리
program
  .command("issue")
  .description("GitHub 이슈 관리")
  .option("-c, --create", "(옵션) 새로운 이슈 생성")
  .action(require("./commands/issue"));

// command: 브랜치 관리
program
  .command("branch")
  .description("GitHub 브랜치 관리")
  .option("-c, --create", "(옵션) 새로운 브랜치 생성")
  .action(require("./commands/branch"));

program.parse(process.argv);

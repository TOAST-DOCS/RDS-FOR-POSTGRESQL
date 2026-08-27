#!/usr/bin/env node
/**
 * 콘솔 번역 메시지 YAML(.md) → Excel 번들링 스크립트 (Node.js)
 *
 * 카테고리는 package.json scripts의 "build:*" 키에서 자동 추출한다.
 * (build:all 제외)
 *
 * 사용법:
 *   npm run build:RDS_POSTGRES_ALPHA          # 단일 카테고리
 *   npm run build:RDS_POSTGRES_ALPHA -- -o dist/
 *   npm run build:all                         # 전체 카테고리
 */

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const ExcelJS = require("exceljs");
const minimist = require("minimist");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const COLUMNS = ["categoryId", "messageType", "messageId", "jaJp", "enUs", "koKr"];

function loadCategoryIds() {
  const pkg = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, "package.json"), "utf-8"));
  const scripts = pkg.scripts || {};
  return Object.keys(scripts)
    .filter((k) => k.startsWith("build:") && k !== "build:all")
    .map((k) => k.slice("build:".length));
}

function parseFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (fmMatch) {
    const meta = yaml.load(fmMatch[1]) || {};
    const items = yaml.load(fmMatch[2]) || [];
    return { categories: meta.categories || [], items };
  }
  return { categories: [], items: yaml.load(raw) || [] };
}

function loadMessages(lang, filename) {
  const filePath = path.join(PROJECT_ROOT, lang, "i18n", filename);
  if (!fs.existsSync(filePath)) return {};
  const { items } = parseFile(filePath);
  const map = {};
  for (const item of items) {
    map[item.messageId] = item;
  }
  return map;
}

function getFileCategories(filename) {
  const filePath = path.join(PROJECT_ROOT, "ko", "i18n", filename);
  if (!fs.existsSync(filePath)) return [];
  return parseFile(filePath).categories;
}

function mergeMessages(filename) {
  const ko = loadMessages("ko", filename);
  const en = loadMessages("en", filename);
  const ja = loadMessages("ja", filename);

  return Object.entries(ko).map(([msgId, item]) => ({
    messageId: msgId,
    messageType: item.messageType || "",
    koKr: item.text || "",
    enUs: (en[msgId] || {}).text || "",
    jaJp: (ja[msgId] || {}).text || "",
  }));
}

async function writeExcel(rows, category, outputPath) {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("messages");

  const headerFill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD9E1F2" } };
  const headerFont = { bold: true };
  const thinBorder = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  const headerRow = ws.addRow(COLUMNS);
  headerRow.eachCell((cell) => {
    cell.fill = headerFill;
    cell.font = headerFont;
    cell.border = thinBorder;
    cell.alignment = { horizontal: "left" };
  });

  for (const row of rows) {
    const dataRow = ws.addRow(
      COLUMNS.map((col) => (col === "categoryId" ? category : row[col] || ""))
    );
    dataRow.eachCell((cell) => {
      cell.border = thinBorder;
    });
  }

  ws.getColumn(1).width = 25;
  ws.getColumn(2).width = 15;
  ws.getColumn(3).width = 20;
  ws.getColumn(4).width = 50;
  ws.getColumn(5).width = 50;
  ws.getColumn(6).width = 50;

  await wb.xlsx.writeFile(outputPath);
}

async function bundleCategory(categoryId, outputDir, today) {
  const koI18nDir = path.join(PROJECT_ROOT, "ko", "i18n");
  const mdFiles = fs.readdirSync(koI18nDir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  if (mdFiles.length === 0) {
    console.error("ko/i18n/ 에 .md 파일이 없습니다.");
    return;
  }

  console.log(`[${categoryId}]`);
  for (const filename of mdFiles) {
    const fileCats = getFileCategories(filename);
    if (fileCats.length > 0 && !fileCats.includes(categoryId)) {
      console.log(`  건너뜀: ${filename} (카테고리 범위 밖)`);
      continue;
    }
    const prefix = path.basename(filename, ".md");
    const rows = mergeMessages(filename);
    if (rows.length === 0) {
      console.log(`  건너뜀: ${filename} (메시지 없음)`);
      continue;
    }

    const output = path.join(outputDir, `${prefix}_${categoryId}_${today}.xlsx`);
    await writeExcel(rows, categoryId, output);
    console.log(`  ${path.relative(PROJECT_ROOT, output)} (${rows.length}건)`);
  }
}

async function main() {
  const args = minimist(process.argv.slice(2), {
    string: ["o", "output-dir"],
    boolean: ["all"],
    alias: { o: "output-dir" },
  });

  const categoryIds = loadCategoryIds();

  if (categoryIds.length === 0) {
    console.error("package.json scripts에 build:* 항목이 없습니다.");
    process.exit(1);
  }

  const outputDir = args["output-dir"] || path.join(PROJECT_ROOT, "dist");
  fs.mkdirSync(outputDir, { recursive: true });
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");

  const lifecycle = process.env.npm_lifecycle_event || "";
  const categoryFromScript = lifecycle.startsWith("build:") ? lifecycle.slice("build:".length) : "";

  let targets;
  if (args.all) {
    targets = categoryIds;
  } else if (categoryFromScript && categoryIds.includes(categoryFromScript)) {
    targets = [categoryFromScript];
  } else if (args._.length > 0) {
    targets = args._.map((a) => String(a));
  } else {
    console.error(`카테고리를 지정하세요: ${categoryIds.join(", ")} 또는 --all`);
    process.exit(1);
  }

  for (const categoryId of targets) {
    if (!categoryIds.includes(categoryId)) {
      console.error(`알 수 없는 카테고리: ${categoryId} (사용 가능: ${categoryIds.join(", ")})`);
      process.exit(1);
    }
    await bundleCategory(categoryId, outputDir, today);
  }

  console.log("번들링 완료");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

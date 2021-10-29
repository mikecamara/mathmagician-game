const Archiver = require("archiver"); // `yarn add --dev archiver` or `npm install --save-dev archiver`
const fs = require("fs");

const IGNORE_DIR_PATTERNS = [/node_modules/, /.git/, /.nyc_output/];
const IGNORE_FILE_PATTERNS = [/public\/app.js/, /public\/app.js.map/];
const TARGET_FILE_NAME = "homework.zip";

const matchesAnyPattern = (patterns, testString) => {
  return patterns.some((pattern) => testString.match(pattern));
};

const pathsInCurrentDirectory = fs.readdirSync(".");

const files = pathsInCurrentDirectory
  .filter((path) => fs.statSync(path).isFile())
  .filter((filePath) => !matchesAnyPattern(IGNORE_FILE_PATTERNS, filePath));

const folders = pathsInCurrentDirectory
  .filter((path) => fs.statSync(path).isDirectory())
  .filter((dirPath) => !matchesAnyPattern(IGNORE_DIR_PATTERNS, dirPath));

const archive = Archiver.create("zip", {});
files.forEach((filePath) => archive.file(filePath));
folders.forEach((folderPath) => archive.directory(folderPath));

archive.pipe(fs.createWriteStream(TARGET_FILE_NAME));
archive.finalize();

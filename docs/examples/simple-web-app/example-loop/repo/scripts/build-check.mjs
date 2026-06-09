import { existsSync, readFileSync } from "node:fs";

const required = ["index.html", "src/app.js", "src/styles.css"];

for (const path of required) {
  if (!existsSync(path)) {
    throw new Error(`Missing required app file: ${path}`);
  }
}

const html = readFileSync("index.html", "utf8");
for (const snippet of ['id="app"', "src/styles.css", "src/app.js"]) {
  if (!html.includes(snippet)) {
    throw new Error(`index.html missing ${snippet}`);
  }
}

console.log("Build check passed.");

import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 10000,
  use: {
    baseURL: "http://127.0.0.1:4173",
  },
  webServer: {
    command: "npx --yes http-server . -p 4173 -a 127.0.0.1 --silent",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
    timeout: 15000,
  },
});

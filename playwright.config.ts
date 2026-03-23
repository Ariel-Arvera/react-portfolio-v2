import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src",
  fullyParallel: true,
  use: {
    baseURL: "http://localhost:8080",
  },
});

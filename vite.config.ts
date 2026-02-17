import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // プロジェクトページの場合はリポジトリ名（末尾スラッシュを忘れずに）
  base: "/Portfolio/",
  plugins: [react()],
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});

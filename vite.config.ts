// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "docs", // ← build 出力先を docs にする
    emptyOutDir: true, // docs を上書きする
  },
});

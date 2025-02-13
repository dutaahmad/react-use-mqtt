import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // Ensure this is the correct entry
  format: ["cjs", "esm"], // Output both CommonJS & ESM
  dts: true, // Generate type declarations
  sourcemap: true, // Include source maps
  clean: true, // Clean previous builds
  minify: false // Disable minification for debugging
});

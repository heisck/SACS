import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    // Vendored React Bits WebGL component: gl-matrix's numeric indexing fights
    // strict noUncheckedIndexedAccess, so the file opts out with @ts-nocheck.
    files: ["src/components/menu/infinite-menu.tsx"],
    rules: { "@typescript-eslint/ban-ts-comment": "off" }
  },
  globalIgnores([
    ".next/**",
    "coverage/**",
    "node_modules/**",
    "playwright-report/**",
    "test-results/**"
  ])
]);

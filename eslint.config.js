import globals from "globals";
import js from "@eslint/js";
import ts from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]}
, {languageOptions: { globals: globals.browser }}
, {rules: {'comma-style': ['error', 'first']}}
, js.configs.recommended
, ...ts.configs.recommended
];

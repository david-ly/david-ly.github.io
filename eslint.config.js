import globals from "globals"
import js from "@eslint/js"
import ts from "typescript-eslint"

const {browser, node} = globals

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [".astro/*"]
  }
, {
    files: ["**/*.{js,mjs,cjs,ts}"]
  , languageOptions: {globals: {...browser}}
  }
, {
    files: ["**/tailwind.config.cjs"]
  , languageOptions: {globals: {...node}}
  }
, {
    files: ["**/*.{mjs,ts}"]
  , languageOptions: {sourceType: "module"}
  }
, {
    rules: {
      'comma-style': ['error', 'first']
    , 'comma-spacing': ['error', {before: false, after: true}]
    }
  }
  , js.configs.recommended
  , ...ts.configs.recommended
];

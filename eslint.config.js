import globals from "globals"
import js from "@eslint/js"
import ts from "typescript-eslint"

const {browser, node} = globals

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*"]
  , ignores: [
      ".astro/*"
    , "node_modules/*"
    , "dist/*"
    ]
  , rules: {
      'eol-last': ['error', 'always']
    , 'linebreak-style': ['error', 'unix']
    }
  }
, {
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
    , 'semi': ['error', 'never']
    }
  }
  , js.configs.recommended
  , ...ts.configs.recommended
]

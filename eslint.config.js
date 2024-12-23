import globals from "globals"
import js from "@eslint/js"
import ts from "typescript-eslint"

const {browser, node} = globals

const ASTRO_IGNORE = ['.astro/*']
const RULES_ALL = {
  'eol-last': ['error', 'always']
, 'linebreak-style': ['error', 'unix']
}
const RULES_JS = {
  'comma-style': ['error', 'first']
, 'comma-spacing': ['error', {before: false, after: true}]
, 'semi': ['error', 'never']
}

const common_js = createFileTypeConfig('**/*.{js,cjs}')
const module_js = createFileTypeConfig('**/*.{mjs,ts}')
const tailwind = createFileTypeConfig('**/tailwind.config.cjs')

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*']
  , ignores: [
      '.astro/*'
    , 'node_modules/*'
    , 'dist/*'
    ]
  , rules: RULES_ALL
  }
, {...common_js}
, {...module_js}
, {...tailwind}
, js.configs.recommended
, ...ts.configs.recommended
]

function createFileTypeConfig(files) {
  const common = {
    files: [`${files}`]
  , ignores: ASTRO_IGNORE
  , rules: RULES_JS
  }
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const {ignores, ...rest} = common

  switch (files) {
    case '**/*.{js,cjs}':
      return {
        ...common
      , languageOptions: {globals: {...browser}}
      }
    case '**/*.{mjs,ts}':
      return {
        ...common
      , languageOptions: {sourceType: 'module'}
      }
    case '**/tailwind.config.cjs':
      return {
        ...common
      , languageOptions: {globals: {...node}}
      }
  }
}

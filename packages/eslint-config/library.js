const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:import/typescript",
    "prettier",
    "turbo",
  ],
  plugins: ["@stylistic/js", "prefer-arrow-functions", "import"],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    "node_modules/",
    "dist/",
  ],
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "prefer-arrow-functions/prefer-arrow-functions": "error",
    curly: ["error", "all"],
    "import/newline-after-import": "error",
    "@stylistic/js/padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: "directive", next: "*" },
      { blankLine: "never", prev: "directive", next: "directive" },
    ],
    "no-console": "error",
    "@typescript-eslint/prefer-nullish-coalescing": [
      "error",
      { ignoreConditionalTests: true },
    ],
  },
  overrides: [
    {
      // https://typescript-eslint.io/getting-started/typed-linting/#how-can-i-disable-type-aware-linting-for-a-subset-of-files
      files: ["*.js?(x)"],
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
    },
  ],
};

const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:@eslint-react/recommended-type-checked-legacy",
    "next/core-web-vitals",
    "prettier",
    "turbo",
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  plugins: ["react-compiler"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project,
  },
  rules: {
    "react-compiler/react-compiler": "error",
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
  ],
  overrides: [
    {
      // https://typescript-eslint.io/getting-started/typed-linting/#how-can-i-disable-type-aware-linting-for-a-subset-of-files
      files: ["*.js?(x)"],
      extends: [
        "plugin:@typescript-eslint/disable-type-checked",
        "plugin:@eslint-react/disable-type-checked-legacy",
      ],
    },
  ],
};

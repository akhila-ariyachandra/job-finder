const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * internal (bundled by their consumer) libraries
 * that utilize React.
 */

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react/recommended",
    "plugin:@eslint-react/recommended-type-checked-legacy",
    "prettier",
    "turbo",
  ],
  plugins: ["react-compiler"],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    browser: true,
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
    "react-compiler/react-compiler": "error",
  },
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

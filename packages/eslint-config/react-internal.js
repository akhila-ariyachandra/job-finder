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
    "plugin:@eslint-react/recommended-type-checked-legacy",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@tanstack/query/recommended",
    "plugin:jsx-a11y/strict",
    "prettier",
    "turbo",
  ],
  plugins: [
    "react-compiler",
    "@stylistic/js",
    "prefer-arrow-functions",
    "import",
  ],
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
    "@typescript-eslint/consistent-type-imports": "error",
    "@eslint-react/no-useless-fragment": "error",
    "@eslint-react/prefer-read-only-props": "error",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "react/jsx-pascal-case": "error",
    "prefer-arrow-functions/prefer-arrow-functions": [
      "error",
      { allowNamedFunctions: true },
    ],
    curly: ["error", "all"],
    "import/newline-after-import": "error",
    "react-hooks/exhaustive-deps": "error",
    "@eslint-react/prefer-read-only-props": "error",
    "@eslint-react/no-leaked-conditional-rendering": "error",
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
    "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "error",
    "@eslint-react/hooks-extra/no-redundant-custom-hook": "error",
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

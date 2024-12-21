import react from "@eslint-react/eslint-plugin";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = tseslint.config(
  eslint.configs.recommended,
  {
    rules: {
      curly: ["error", "all"],
      "no-console": "error",
      "no-restricted-syntax": [
        "error",
        {
          // Disallow TS enums
          selector: "TSEnumDeclaration",
          message: "Don't declare enums. Use objects with `as const` instead.",
        },
      ],
    },
  },
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
  compat.config({
    plugins: ["prefer-arrow-functions"],
    rules: {
      "prefer-arrow-functions/prefer-arrow-functions": "error",
    },
  }),
  {
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: "directive", next: "*" },
        { blankLine: "never", prev: "directive", next: "directive" },
      ],
    },
  },
  {
    plugins: importPlugin,
    settings: {
      "import/resolver-next": [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
        }),
      ],
    },
    rules: {
      "import/newline-after-import": "error",
    },
  },
  compat.config({
    extends: ["next/core-web-vitals"],
  }),
  compat.config({
    plugins: ["react-compiler"],
    rules: {
      "react-compiler/react-compiler": "error",
    },
  }),
  {
    extends: [react.configs["recommended-type-checked"]],
    rules: {
      "@eslint-react/hooks-extra/no-unnecessary-use-callback": "error",
      "@eslint-react/hooks-extra/no-unnecessary-use-memo": "error",
      "@eslint-react/naming-convention/filename": [
        "error",
        {
          rule: "kebab-case",
        },
      ],
    },
  },
  {
    rules: {
      "react/jsx-no-useless-fragment": "error",
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
    },
  },
  eslintConfigPrettier,
);

export default eslintConfig;

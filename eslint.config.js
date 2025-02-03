import jsPlugin from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

const filesConfig = {
  files: ["**/*.{js,ts,tsx}"],
};

const jsConfig = {
  languageOptions: {
    globals: globals.node,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  rules: {
    ...jsPlugin.configs.recommended.rules,
    "arrow-parens": ["error", "always"],
    curly: ["error", "all"],
    eqeqeq: ["error", "always"],
    "max-params": ["error", 3],
    "no-console": ["warn"],
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
      },
    ],
    "object-shorthand": ["error"],
    "prefer-destructuring": ["error"],
    quotes: ["error", "double"],
  },
};

const typescriptConfig = {
  ignores: ["eslint.config.js"],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: "./tsconfig.json",
    },
  },
  plugins: {
    "@typescript-eslint": tsPlugin,
  },
  rules: {
    ...tsPlugin.configs["strict-type-checked"].rules,
    "@typescript-eslint/consistent-type-exports": ["error"],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowTypedFunctionExpressions: true,
      },
    ],
    "@typescript-eslint/explicit-member-accessibility": ["error"],
    "@typescript-eslint/return-await": ["error", "always"],
  },
};

const overridesConfigs = [
  {
    files: ["prettier.config.ts", "eslint.config.js"],
    rules: {
      "import/no-default-export": ["off"],
    },
  },
  {
    files: ["*.js"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": ["off"],
    },
  },
];

const config = [filesConfig, jsConfig, typescriptConfig, ...overridesConfigs];

export default config;

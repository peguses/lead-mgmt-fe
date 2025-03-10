module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "@typescript-eslint"],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    // "linebreak-style": "off",
    "no-empty-function": ["error", { allow: ["methods"] }],
    "@typescript-eslint/no-empty-function": "error",
    "prettier/prettier": [
      "error",
      {
        allow: ["methods"],
        trailingComma: "none",
      },
    ],
  },
};

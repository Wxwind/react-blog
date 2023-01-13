module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  extends: ["react-app", "react-app/jest"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};

module.exports = {
  root: true,
  extends: ["@react-native-community", "prettier"],
  plugins: ["import", "jest"],
  env: {
    browser: true,
    es6: true,
    node: true,
    "jest/globals": true,
  },
  overrides: [
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      rules: {
        "import/order": [
          "error",
          {
            groups: ["external", "builtin", "internal", "parent", "sibling"],
            pathGroups: [
              {
                pattern: "react+(|-native)",
                group: "external",
                position: "before",
              },
              {
                pattern: "@+(routes|components|hooks|themes|utils|env|storage|assets|services|screens)",
                group: "internal",
                position: "before",
              },
              {
                pattern: "./",
                group: "internal",
                position: "before",
              },
            ],
            pathGroupsExcludedImportTypes: ["react+(|-native)"],
            alphabetize: {
              order: "asc",
              caseInsensitive: true,
            },
            "newlines-between": "always",
          },
        ],
        quotes: ["error", "double"],
      },
    },
  ],
};

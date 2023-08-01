module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    ["react-native-reanimated/plugin"],
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          "@hooks": "./src/hooks",
          "@utils": "./src/utils",
          "@routes": "./src/routes",
          "@themes": "./src/themes",
          "@assets": "./src/assets",
          "@screens": "./src/screens",
          "@storage": "./src/storage",
          "@services": "./src/services",
          "@components": "./src/components",
        },
      },
    ],
    [
      "module:react-native-dotenv",
      {
        envName: "APP_ENV",
        moduleName: "@env",
        path: ".env",
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
  ],
};

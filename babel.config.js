module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
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
          "@storage": "./src/storage",
          "@services": "./src/services",
          "@features": "./src/features",
          "@contexts": "./src/contexts",
          "@components": "./src/components",
        },
      },
    ],
  ],
};

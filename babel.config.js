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
          "@storage": "./src/storage",
          "@features": "./src/features",
          "@contexts": "./src/contexts",
          "@components": "./src/components",
        },
      },
    ],
  ],
};

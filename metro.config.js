
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");

const defaultConfig = getDefaultConfig(__dirname);

// 🔹 SVG support add
const {
  transformer,
  resolver: { sourceExts, assetExts },
} = defaultConfig;

const svgConfig = {
  transformer: {
    ...transformer,
    babelTransformerPath: require.resolve(
      "react-native-svg-transformer"
    ),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"],
  },
};

const config = mergeConfig(defaultConfig, svgConfig);

// 🔹 NativeWind wrapper
module.exports = withNativeWind(config, {
  input: "./global.css",
});



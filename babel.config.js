// Reanimated v4 (SDK 54+) is configured automatically by babel-preset-expo.
// Do NOT add 'react-native-reanimated/plugin' or 'react-native-worklets/plugin' manually here.
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
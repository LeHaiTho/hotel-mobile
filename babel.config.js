module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['.'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@naviagtion': './src/navigation',
          '@screens': './src/screens',
          '@services': './src/services',
          '@stores': './src/stores',
          '@styles': './src/styles',
          '@utils': './src/utils',
        },
      },
      'react-native-reanimated/plugin',
    ],
  ],
};

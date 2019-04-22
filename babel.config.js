const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
        node: "8.9.4"
      },
      debug: false
    }
  ]
];
const plugins = [
  [
    "@babel/plugin-transform-runtime",
    {
      corejs: false,
      helpers: true,
      regenerator: false,
      useESModules: true
    }
  ]
];

module.exports = { presets, plugins };

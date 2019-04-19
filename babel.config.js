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
      useBuiltIns: "usage",
      debug: false
    }
  ]
];

module.exports = { presets };

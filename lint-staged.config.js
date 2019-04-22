module.exports = {
  "src/**/*.js": ["eslint --fix --ext .js", "prettier --write", "git add"],
  "*.json": ["prettier --write", "git add"]
};

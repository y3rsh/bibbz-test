module.exports = {
  "env": {
      "browser": false
  },
  "extends": [
      "standard"
  ],
  "rules": {
      "no-unused-vars": ["error", { "vars": "all", "varsIgnorePattern": "^_", "args": "none" }],
  }
};
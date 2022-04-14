module.exports = {
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/changelog", {
      "changelogFile": "CHANGELOG.md",
    }],
    "@semantic-release/npm",
    ["@semantic-release/git", {
      "assets": ["package.json", "CHANGELOG.md"],
      "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
    }],
    ["@semantic-release/github", {
      "assets": [
        { "path": "dist/helix-web-library.esm.js", "label": "Helix Web Library ESM" },
        { "path": "dist/helix-web-library.esm.min.js", "label": "Helix Web Library ESM (Minified)" },
        { "path": "dist/helix-web-forms.esm.js", "label": "Helix Web Forms ESM" },
        { "path": "dist/helix-web-forms.esm.min.js", "label": "Helix Web Forms ESM (Minified)" },
      ]
    }]
  ],
  branches: ['main'],
};

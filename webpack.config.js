/**
 * Webpack configuration for Angular Component Tagging
 * This enables Select UI to Edit feature in Codex
 */

const AngularComponentTagger = require('./angular-webpack-component-tagger');

module.exports = {
  plugins: [
    new AngularComponentTagger()
  ]
};
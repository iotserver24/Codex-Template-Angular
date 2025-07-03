/**
 * Webpack configuration for Angular Component Tagging
 * This enables Select UI to Edit feature in Dyad.sh
 */

const { createComponentTagger } = require('./angular-component-tagger');

module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({
                before: [createComponentTagger()]
              })
            }
          }
        ]
      }
    ]
  }
};
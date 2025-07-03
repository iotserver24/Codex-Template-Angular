/**
 * Angular Component Tagger for Dyad.sh Select UI to Edit feature
 * 
 * This transformer adds data attributes to Angular components during compilation
 * to enable the Select UI to Edit functionality in Dyad.sh
 */

const ts = require('typescript');
const path = require('path');

function createComponentTagger() {
  return (context) => {
    return (sourceFile) => {
      if (!sourceFile.fileName.endsWith('.ts') || sourceFile.fileName.includes('.spec.')) {
        return sourceFile;
      }

      const visitor = (node) => {
        // Check if this is a component decorator
        if (ts.isDecorator(node) && 
            node.expression && 
            ts.isCallExpression(node.expression)) {
          
          const decoratorName = node.expression.expression.getText();
          
          if (decoratorName === 'Component') {
            const args = node.expression.arguments;
            if (args.length > 0 && ts.isObjectLiteralExpression(args[0])) {
              // Add component tagging logic here
              const properties = args[0].properties;
              
              // Find the component selector
              const selectorProp = properties.find(prop => 
                prop.name && prop.name.getText() === 'selector'
              );
              
              if (selectorProp && ts.isPropertyAssignment(selectorProp)) {
                const selector = selectorProp.initializer.getText().replace(/['"]/g, '');
                const componentName = path.basename(sourceFile.fileName, '.ts');
                
                // Store metadata for later use in template transformation
                if (!global.__dyadComponentMap) {
                  global.__dyadComponentMap = new Map();
                }
                global.__dyadComponentMap.set(selector, {
                  file: sourceFile.fileName,
                  name: componentName
                });
              }
            }
          }
        }
        
        return ts.visitEachChild(node, visitor, context);
      };
      
      return ts.visitNode(sourceFile, visitor);
    };
  };
}

// Template transformer to add data attributes
function createTemplateTagger() {
  return {
    name: 'dyad-template-tagger',
    transformIndexHtml(html) {
      // Add data attributes to component elements in templates
      if (global.__dyadComponentMap) {
        global.__dyadComponentMap.forEach((metadata, selector) => {
          const regex = new RegExp(`<${selector}([^>]*)>`, 'g');
          html = html.replace(regex, (match, attrs) => {
            const dataAttrs = `data-dyad-component="${metadata.name}" data-dyad-file="${metadata.file}"`;
            return `<${selector} ${dataAttrs}${attrs}>`;
          });
        });
      }
      return html;
    }
  };
}

module.exports = {
  createComponentTagger,
  createTemplateTagger
};
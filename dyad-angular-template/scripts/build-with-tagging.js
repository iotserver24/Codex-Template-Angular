#!/usr/bin/env node

/**
 * Build script that integrates component tagging for Dyad.sh
 * This script wraps the Angular build process to add Select UI to Edit support
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building Angular app with Dyad.sh component tagging...');

// Run the standard Angular build
try {
  execSync('ng build', { stdio: 'inherit' });
  
  // Post-process the built files to add component tags
  const distPath = path.join(__dirname, '..', 'dist', 'dyad-angular-template');
  
  if (fs.existsSync(distPath)) {
    console.log('Adding Dyad.sh component tags to built files...');
    
    // Add a script to enable Select UI to Edit in the index.html
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      let indexContent = fs.readFileSync(indexPath, 'utf8');
      
      // Add Dyad.sh component tagging script
      const dyadScript = `
  <script>
    // Dyad.sh Select UI to Edit support
    window.__DYAD_COMPONENT_TAGGING_ENABLED__ = true;
  </script>
`;
      
      indexContent = indexContent.replace('</body>', `${dyadScript}</body>`);
      fs.writeFileSync(indexPath, indexContent);
      
      console.log('✓ Component tagging added successfully');
    }
  }
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
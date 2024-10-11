import fs from 'fs';
import path from 'path';

// Path to the images directory
const imagesDir = path.join(process.cwd(), ''); // Adjust if images are in the current folder
const indexFile = path.join(imagesDir, 'index.tsx');

// Read files in the directory
fs.readdir(imagesDir, (err, files) => {
  if (err) throw err;

  const imageImports = [];
  const exports = [];

  files.forEach((file) => {
    if (/\.(jpg|jpeg|png|gif|svg)$/.test(file)) {
      const imageName = path.basename(file, path.extname(file)); // Get the name without extension
      imageImports.push(`import ${imageName} from './${file}';`);
      exports.push(imageName);
    }
  });

  const content = `${imageImports.join('\n')}\n\nexport {\n    ${exports.join(',\n    ')}\n};\n`;

  // Write to index.tsx
  fs.writeFile(indexFile, content, (err) => {
    if (err) throw err;
    console.log('Image index created successfully!');
  });
});

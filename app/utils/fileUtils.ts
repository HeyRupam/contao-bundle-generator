import fs from 'fs';
import archiver from 'archiver';

interface ProcessAndAddFileOptions {
  bundleName?: string;
  namespace?: string;
  copyright?: string;
  elementName?: string;
}

export function processAndAddFileToZip(
  archive: archiver.Archiver,
  filePath: string,
  zipPath: string,
  options: ProcessAndAddFileOptions
) {
  const {
    bundleName = '',
    namespace = '',
    copyright = '',
    elementName = '',
    } = options;

  let fileContent;
  try {
    fileContent = fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    console.error('Error reading file:', err);
    throw new Error('Failed to read the source file');
  }

  // Replace placeholders with the actual folder name
  fileContent = fileContent.replace(/###namespace###/g, toSnakeCase(namespace));
  fileContent = fileContent.replace(/###Namespace###/g, toPascalCase(namespace));
  fileContent = fileContent.replace(/###bundle_name###/g, toSnakeCase(bundleName));
  fileContent = fileContent.replace(/###BundleName###/g, toPascalCase(bundleName));
  fileContent = fileContent.replace(/###Bundle_Name###/g, bundleName);
  fileContent = fileContent.replace(/###Copyright###/g, copyright);
  fileContent = fileContent.replace(/###ElementName###/g, toPascalCase(elementName));
  fileContent = fileContent.replace(/###element_name###/g, toSnakeCase(elementName));


  // Add the processed content to the ZIP archive
  archive.append(fileContent, { name: zipPath });
}

export function toSnakeCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '_');
}

export function toPascalCase(str: string): string {
  return str
    .split(' ')                      // Split the string into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Capitalize the first letter of each word
    .join('');                       // Join the words together without spaces
}

export function toCamelCase(str: string): string {
  return str
    .toLowerCase()
    .split('_') 
    .map((word, index) => 
      index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word.charAt(0).toUpperCase() + word.slice(1)
    ) 
    .join(''); 
}
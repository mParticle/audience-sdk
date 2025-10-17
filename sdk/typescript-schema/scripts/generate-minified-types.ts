#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';

interface ImportInfo {
    imported: string[];
    from: string;
}

/**
 * Extracts import statements from a TypeScript file
 */
function extractImports(content: string): ImportInfo[] {
    const imports: ImportInfo[] = [];
    const importRegex = /import\s+(?:{([^}]+)}|(\w+))\s+from\s+['"]([^'"]+)['"]/g;

    let match;
    while ((match = importRegex.exec(content)) !== null) {
        const namedImports = match[1];
        const defaultImport = match[2];
        const from = match[3];

        if (namedImports) {
            const imported = namedImports.split(',').map(i => i.trim());
            imports.push({ imported, from });
        } else if (defaultImport) {
            imports.push({ imported: [defaultImport], from });
        }
    }

    return imports;
}

/**
 * Removes import and export keywords from content, and filters out non-type declarations
 */
function removeImportsAndExports(content: string): string {
    // Remove import statements
    content = content.replace(/import\s+(?:{[^}]+}|\w+)\s+from\s+['"][^'"]+['"];?\n?/g, '');

    // Remove export keyword but keep the type/enum/interface declarations only
    content = content.replace(/export\s+(type|enum|interface)/g, '$1');

    // Split content into lines and filter out non-type declarations
    const lines = content.split('\n');
    const filteredLines: string[] = [];
    let inConstDeclaration = false;
    let braceCount = 0;

    for (const line of lines) {
        // Check if this line starts a const, class, or function declaration
        if (/^(export\s+)?(const|class|function)\s+/.test(line.trim())) {
            inConstDeclaration = true;
            braceCount = (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
            if (braceCount === 0 && line.includes(';')) {
                // Single line const declaration
                inConstDeclaration = false;
            }
            continue; // Skip this line
        }

        if (inConstDeclaration) {
            // Count braces to know when the declaration ends
            braceCount += (line.match(/{/g) || []).length;
            braceCount -= (line.match(/}/g) || []).length;

            if (braceCount <= 0) {
                inConstDeclaration = false;
            }
            continue; // Skip this line
        }

        // Keep type, enum, and interface declarations
        filteredLines.push(line);
    }

    content = filteredLines.join('\n');

    return content;
}

/**
 * Removes comments from TypeScript code
 */
function removeComments(content: string): string {
    // Remove multi-line comments (including JSDoc)
    content = content.replace(/\/\*\*?[\s\S]*?\*\//g, '');

    // Remove single-line comments
    content = content.replace(/\/\/.*$/gm, '');

    return content;
}

/**
 * Minifies TypeScript content by removing extra whitespace
 */
function minify(content: string): string {
    // Remove multiple blank lines
    content = content.replace(/\n\s*\n\s*\n/g, '\n');

    // Remove trailing whitespace
    content = content.replace(/[ \t]+$/gm, '');

    // Remove leading whitespace from lines (but preserve indentation structure)
    // This is conservative to maintain readability

    return content.trim();
}

/**
 * Resolves a relative import path to an absolute file path
 */
function resolveImportPath(currentFilePath: string, importPath: string): string {
    const currentDir = path.dirname(currentFilePath);
    const resolved = path.resolve(currentDir, importPath);

    // Try with .ts extension if it doesn't exist
    if (fs.existsSync(resolved + '.ts')) {
        return resolved + '.ts';
    }
    if (fs.existsSync(resolved)) {
        return resolved;
    }

    throw new Error(`Cannot resolve import: ${importPath} from ${currentFilePath}`);
}

/**
 * Recursively collects all type definitions from a file and its imports
 */
function collectTypeDefinitions(
    filePath: string,
    visited: Set<string> = new Set(),
    definitions: Map<string, string> = new Map()
): Map<string, string> {
    // Avoid circular dependencies
    const absolutePath = path.resolve(filePath);
    if (visited.has(absolutePath)) {
        return definitions;
    }
    visited.add(absolutePath);

    // Read the file
    const content = fs.readFileSync(absolutePath, 'utf-8');

    // Extract imports and recursively process them first
    const imports = extractImports(content);
    for (const importInfo of imports) {
        try {
            const importedFilePath = resolveImportPath(absolutePath, importInfo.from);
            collectTypeDefinitions(importedFilePath, visited, definitions);
        } catch (e) {
            console.warn(`Warning: Could not resolve import ${importInfo.from} in ${filePath}`);
        }
    }

    // Process current file content
    let processedContent = removeImportsAndExports(content);
    processedContent = removeComments(processedContent);
    processedContent = minify(processedContent);

    // Only add if there's actual content
    if (processedContent.trim()) {
        definitions.set(absolutePath, processedContent);
    }

    return definitions;
}

/**
 * Extracts the version value from version.ts
 */
function extractVersion(rootDir: string): string {
    const versionFile = path.join(rootDir, 'version.ts');
    try {
        const content = fs.readFileSync(versionFile, 'utf-8');
        const versionMatch = content.match(/VERSION\s*=\s*['"]([^'"]+)['"]/);
        if (versionMatch) {
            return versionMatch[1];
        }
    } catch (e) {
        console.warn('Warning: Could not read version from version.ts');
    }
    return 'unknown';
}

/**
 * Main function
 */
function main() {
    const rootDir = path.resolve(__dirname, '..');
    const audienceFile = path.join(rootDir, 'audience.ts');
    const outputDir = path.join(rootDir, 'schema');
    const outputFile = path.join(outputDir, 'audience-types.min.ts');

    console.log('Collecting type definitions from:', audienceFile);

    // Collect all type definitions
    const definitions = collectTypeDefinitions(audienceFile);

    // Extract version
    const version = extractVersion(rootDir);

    // Prepend version constant and combine all definitions
    const versionExport = `export const CURRENT_VERSION = "${version}";\n`;
    const combined = versionExport + Array.from(definitions.values()).join('\n');

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the output
    fs.writeFileSync(outputFile, combined, 'utf-8');

    console.log(`Generated minified types at: ${outputFile}`);
    console.log(`Version: ${version}`);
    console.log(`Total files processed: ${definitions.size}`);
    console.log(`Output size: ${combined.length} characters`);
}

// Run the script
main();


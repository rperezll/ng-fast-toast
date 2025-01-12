const fs = require('fs');
const exec = require('child_process');
const path = require('path');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');

// 🔎 Recursively search for *.component.html files
function findComponentHtmlFiles(dir, files = []) {
	fs.readdirSync(dir).forEach((file) => {
		const fullPath = path.join(dir, file);
		if (fs.statSync(fullPath).isDirectory()) {
			findComponentHtmlFiles(fullPath, files);
		} else if (file.endsWith('.component.html')) {
			files.push(fullPath);
		}
	});
	return files;
}

// 🔎 Recursively search for *.component.ts files
function findComponentTsFiles(dir, files = []) {
	fs.readdirSync(dir).forEach((file) => {
		const fullPath = path.join(dir, file);
		if (fs.statSync(fullPath).isDirectory()) {
			findComponentTsFiles(fullPath, files);
		} else if (file.endsWith('.component.ts')) {
			files.push(fullPath);
		}
	});
	return files;
}

// 🏗️ Create a backup of a file
function backupFile(filePath) {
	const backupPath = `${filePath}.bak`;
	if (!fs.existsSync(backupPath)) {
		fs.copyFileSync(filePath, backupPath);
	}
}

// 🛠️ Restore a file from its backup
function restoreFile(filePath) {
	const backupPath = `${filePath}.bak`;
	if (fs.existsSync(backupPath)) {
		fs.copyFileSync(backupPath, filePath);
		fs.unlinkSync(backupPath);
	}
}

// Update the Angular component decorator
function updateComponentDecorator(componentPath, cssFilePath = null) {
	let content = fs.readFileSync(componentPath, 'utf8');

	// Backup the file before modifying
	backupFile(componentPath);

	// Add or replace import for ViewEncapsulation
	const viewEncapsulationImport = `ViewEncapsulation`;
	const angularCoreImportRegex = /import\s*\{\s*([^\}]*)\}\s*from\s*'@angular\/core';/;

	if (angularCoreImportRegex.test(content)) {
		content = content.replace(angularCoreImportRegex, (match, imports) => {
			// Check if ViewEncapsulation is already imported
			const importList = imports.split(',').map((imp) => imp.trim());
			if (!importList.includes(viewEncapsulationImport)) {
				importList.push(viewEncapsulationImport);
			}
			return `import { ${importList.join(', ')} } from '@angular/core';`;
		});
	} else {
		// Add the import if it doesn't exist
		content = `import { ${viewEncapsulationImport} } from '@angular/core';\n` + content;
	}

	// Add or replace encapsulation: ViewEncapsulation.ShadowDom
	const encapsulationRegex = /encapsulation\s*:\s*ViewEncapsulation\.[a-zA-Z]+/;
	if (encapsulationRegex.test(content)) {
		// Replace existing encapsulation
		content = content.replace(encapsulationRegex, `encapsulation: ViewEncapsulation.ShadowDom`);
	} else {
		// Add encapsulation if it doesn't exist
		content = content.replace(/@Component\(\{/, `@Component({\n  encapsulation: ViewEncapsulation.ShadowDom,`);
	}

	// If a CSS file path is provided, add or update `styleUrls`
	if (cssFilePath) {
		const styleUrlsRegex = /styleUrls\s*:\s*\[([^\]]*)\]/;
		const newCssPath = `./${path.basename(cssFilePath)}`;

		if (styleUrlsRegex.test(content)) {
			// If styleUrls exists, add the new path to the array if it's not already there
			content = content.replace(styleUrlsRegex, (match, existingPaths) => {
				// Normalize paths (remove quotes)
				const paths = existingPaths.split(',').map((path) => path.trim().replace(/^['"]|['"]$/g, ''));

				if (!paths.includes(newCssPath)) {
					paths.push(newCssPath);
				}

				const updatedPaths = paths.map((p) => `'${p}'`).join(', ');
				return `styleUrls: [${updatedPaths}]`;
			});
		} else {
			// If styleUrls does not exist, add it
			content = content.replace(/@Component\(\{/, `@Component({\n  styleUrls: ['./${path.basename(cssFilePath)}'],`);
		}
	}

	fs.writeFileSync(componentPath, content);
}

// 🚀 Update all component TS files
function updateAllComponentDecorators(baseDir) {
	const componentTsFiles = findComponentTsFiles(baseDir);

	componentTsFiles.forEach((file) => {
		updateComponentDecorator(file);
		console.info(`🟢 Updated: ${file}`);
	});
}

// Function that, given a plain HTML content string, searches for Tailwind CSS classes located within the class attribute or the Angular ngClass attribute.
function extractClassesFromHtml(html) {
	// ⚡ Static Classes
	// 👀 Target Example: <div class="mr-3"></div>
	const staticClassRegex = /class="([^"]*)"/g;
	// Result: ['mr-3']

	// ⚡ Angular ng Classes
	// 👀 Target Example: <div [ngClass]="{'mr-3': condition}"></div>
	const ngClassRegex = /\[ngClass\]="([^"]*)"/g;
	// Result: {'mr-3': condition}
	const ngClassObjectRegex = /'([^']+)'/g;
	// Result: ['mr-3']

	// ⚡ Angular ng Classes Array
	// 👀 Target Example: <div [ngClass]="['mr-3', 'ml-3']"></div>
	const ngClassArrayRegex = /"([^"]+)"|\[([^]]+)\]/g;
	// Result: ['mr-3', 'ml-3']

	const classes = new Set();

	// ⚡ Static classes
	let match;
	while ((match = staticClassRegex.exec(html)) !== null) {
		match[1]
			.split(/\s+/)
			.filter(Boolean)
			.forEach((cls) => classes.add(cls));
	}

	// ⚡ Angular ng Classes & ⚡ Angular ng Classes Array
	while ((match = ngClassRegex.exec(html)) !== null) {
		const ngClassContent = match[1];

		let objectMatch;
		while ((objectMatch = ngClassObjectRegex.exec(ngClassContent)) !== null) {
			classes.add(objectMatch[1]);
		}

		let arrayMatch;
		while ((arrayMatch = ngClassArrayRegex.exec(ngClassContent)) !== null) {
			const arrayClasses = arrayMatch[1] || arrayMatch[2];
			if (arrayClasses) {
				arrayClasses
					.split(/[\s,]+/)
					.filter(Boolean)
					.forEach((cls) => classes.add(cls));
			}
		}
	}

	return [...classes];
}

// 🚀 Generate a complete CSS file for component
async function generateCssForComponents(baseDir) {
	// Update all TS files first
	updateAllComponentDecorators(baseDir);

	const componentFiles = findComponentHtmlFiles(baseDir);

	const results = [];

	console.info(`🟢 [ng-fast-toast-cssbuild] Files found: ${componentFiles.length}`);
	for (const file of componentFiles) {
		const htmlContent = fs.readFileSync(file, 'utf8');
		const classes = extractClassesFromHtml(htmlContent);

		let resultRow = {
			component: path.basename(file),
			twFound: classes.length > 0 ? 'Yes' : 'No',
			cssGenerated: '',
		};

		if (classes.length === 0) {
			resultRow.cssGenerated = 'No';
			results.push(resultRow);
			continue;
		}

		const cssContent = classes.map((cls) => `<div class="${cls}"></div>`).join('\n');
		const tailwindConfig = {
			content: [{ raw: cssContent }],
			theme: { extend: {} },
		};

		try {
			const result = await postcss([tailwindcss(tailwindConfig)]).process('@tailwind base; @tailwind components; @tailwind utilities;', {
				from: undefined,
			});

			// 🏗️ Generate *.component.css file
			const cssFilePath = file.replace('.component.html', '.component.css');
			fs.writeFileSync(cssFilePath, result.css);

			// 🏗️ Update the corresponding .ts file
			const tsFilePath = file.replace('.component.html', '.component.ts');
			if (fs.existsSync(tsFilePath)) {
				// Backup the .ts file before modifying it
				backupFile(tsFilePath);

				updateComponentDecorator(tsFilePath, cssFilePath);
			}

			resultRow.cssGenerated = 'Yes';
		} catch (error) {
			console.error(`🔴 [ng-fast-toast-cssbuild] Processing error ${file}:`, error);
			resultRow.cssGenerated = 'Error';
			resultRow.tsModified = 'Error';
		}

		results.push(resultRow);
	}

	// 👀 Resume Results
	console.table(results);
}

async function main(baseDir, command) {
	console.info('🟢 [ng-fast-toast-cssbuild] Build CSS started.');
	await generateCssForComponents(baseDir);
	console.info('🟢 [ng-fast-toast-cssbuild] Build CSS completed.');
	console.info('🟢 [ng-fast-toast-cssbuild] Command started.');

	try {
		const result = await executeCommand(command);
		console.info('🟢 [ng-fast-toast-cssbuild] Command completed.');

		console.info('🔄 [ng-fast-toast-cssbuild] Restoring modified files...');
		const componentFiles = findComponentHtmlFiles(baseDir);
		// for (const file of componentFiles) {
		// 	const tsFilePath = file.replace('.component.html', '.component.ts');
		// 	const cssFilePath = file.replace('.component.html', '.component.css');

		// 	// Restore TS file
		// 	if (fs.existsSync(`${tsFilePath}.bak`)) {
		// 		restoreFile(tsFilePath);
		// 		console.info(`🟢 Restored: ${tsFilePath}`);
		// 	}

		// 	// Delete generated CSS file
		// 	deleteGeneratedCss(cssFilePath);
		// }
		console.info('🟢 [ng-fast-toast-cssbuild] All files restored.');
	} catch (error) {
		console.error('🔴 [ng-fast-toast-cssbuild] Command Execution Error:', error.message);
	}

	// 🛠️ Restore all modified files
}

async function executeCommand(command) {
	return new Promise((resolve, reject) => {
		exec.exec(
			command,
			{
				listeners: {
					stdout: (data) => {
						output += data.toString();
					},
					stderr: (data) => {
						output += data.toString();
					},
				},
			},
			(error, stdout, stderr) => {
				if (error) {
					reject(new Error(`Command failed with error: ${error.message}`));
				} else {
					resolve(stdout);
				}
			},
		);
	});
}

// Function to delete a generated CSS file
function deleteGeneratedCss(filePath) {
	if (fs.existsSync(filePath)) {
		fs.unlinkSync(filePath);
		console.info(`🗑️ Deleted: ${filePath}`);
	}
}

const baseDir = path.resolve('.');
main(baseDir, 'ng build');

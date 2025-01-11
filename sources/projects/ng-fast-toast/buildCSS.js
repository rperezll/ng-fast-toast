const fs = require('fs');
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

// 🚀 Main Function
async function generateCssForComponents(baseDir) {
	const componentFiles = findComponentHtmlFiles(baseDir);

	const results = [];

	console.info(`🟢 [ng-fast-toast-cssbuild] Files found: ${componentFiles.length}`);
	for (const file of componentFiles) {
		const htmlContent = fs.readFileSync(file, 'utf8');
		const classes = extractClassesFromHtml(htmlContent);

		let resultRow = {
			component: path.basename(file), // Only the component name without the full path
			classesFound: classes.length > 0 ? 'Yes' : 'No',
			cssFileGenerated: '',
		};

		if (classes.length === 0) {
			resultRow.cssFileGenerated = 'No';
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
			resultRow.cssFileGenerated = 'Yes';
		} catch (error) {
			console.error(`🔴 [ng-fast-toast-cssbuild] Processing error ${file}:`, error);
			resultRow.cssFileGenerated = 'Error';
		}

		results.push(resultRow);
	}

	// 👀 Resume Results
	console.table(results);
}

const baseDir = path.resolve('.');
generateCssForComponents(baseDir).then(() => {
	console.info('🟢 [ng-fast-toast-cssbuild] Build CSS completed.');
});

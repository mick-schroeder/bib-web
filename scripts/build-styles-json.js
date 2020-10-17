'use strict';

const appDefaults = require('../src/js/constants/defaults');
const argv = require('minimist')(process.argv.slice(2));
const fetch = require('isomorphic-fetch');
const fs = require('fs-extra');
const path = require('path');

const stylesCacheTime = argv['stylesCacheTime'] || 0;

const styles = [
	'american-medical-association-no-url',
	'modern-language-association',
	'apa',
	'national-library-of-medicine',
	'chicago-note-bibliography',
	'turabian-fullnote-bibliography'
];
const defaultStyle = 'american-medical-association-no-url';

(async () => {
	const stylesJsonPath = path.join(__dirname, '..', 'data', 'styles.json');
	const coreStylesPath = path.join(__dirname, '..', 'data', 'citation-styles-data.json');
	var stylesMeta;
	try {
		stylesMeta = await fs.readJson(stylesJsonPath);
		var stat = await fs.stat(stylesJsonPath);
		if(new Date() - new Date(stat.mtime) > stylesCacheTime) {
			throw new Error();
		}
	} catch(e) {
		console.log(`Downloading ${appDefaults.stylesURL}`);
		stylesMeta = await (await fetch(appDefaults.stylesURL)).json();
		await fs.outputJson(stylesJsonPath, stylesMeta);
	}
	const coreCitationStyles = styles.map(style => {
		const styleMeta = stylesMeta.find(sm => sm.name === style);
		if(!styleMeta) {
			console.warn(`Could not find name for style ${style}`);
			return;
		}
		return {
			isDefault: style === defaultStyle,
			name: style,
			title: styleMeta.title,
		};
	}).filter(Boolean);
	const citationStylesCount = stylesMeta.length;
	const output = {
		coreCitationStyles,
		citationStylesCount
	};
	await fs.outputJson(coreStylesPath, output);
	console.log('citation-styles-data.json has been generated');
})();

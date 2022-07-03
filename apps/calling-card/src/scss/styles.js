/**
 * This file processes the styles as a single string.
 */
const path = require('path');
const sass = require('node-sass');
const fs = require('fs');

const file = fs.readFileSync(path.join(__dirname, 'index.scss'), 'utf8');

const output = sass.renderSync({
    data: file,
    indentedSyntax: false,
    outputStyle: 'compressed',
});

module.exports = JSON.stringify(output.css.toString());

/* eslint-disable */
'use strict'

const { sync } = require('glob');
const { execSync } = require('child_process');

const baseComponentsPath = process.env.BASE_PATH;
const baseDocsPath = process.env.DOCS_PATH;

const globOptions = {
    ignore: `${baseComponentsPath}/**/*.test.js`
}

let componentsDir = sync(`${baseComponentsPath}/**/*.js`, globOptions);

componentsDir.forEach((c) => {
    // Gets file name, removing path and extension
    const componentName = c.split('/').pop(-1).split('.')[0];
    
    execSync(`react-docgen ${c} --pretty -o ${baseDocsPath}/${componentName}.json`);
});

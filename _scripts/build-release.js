const path = require('path');
const { execSync } = require('child_process');
const packageSnippets = require('./build-snippets-extension');

const [,,versionType] = process.argv;

if(!versionType) {
    throw new Error('Please specify a version type (major, minor, patch)');
}

function versionRepository() {
    execSync('git add --all');
    execSync('git commit -m "Fresh build of workshop resources"');
    execSync('npm version ' + versionType, { stdio: 'inherit' });
}

packageSnippets();
versionRepository();
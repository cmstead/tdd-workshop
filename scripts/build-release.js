const path = require('path');
const { execSync } = require('child_process');

const [,,versionType] = process.argv;

if(!versionType) {
    throw new Error('Please specify a version type (major, minor, patch)');
}

function packageSnippets() {
    const snippetDir = path.join(
        process.cwd(),
        'workshop-assets',
        'tdd-workshop-snippets'
    );

    execSync(
        'vsce package -o tdd-workshop-snippets.vsix',
        { 
            cwd: snippetDir,
            stdio: 'inherit'
        }
    );
}

function versionRepository() {
    execSync('git add --all');
    execSync('git commit -m "Fresh build of workshop resources"');
    execSync('npm version ' + versionType, { stdio: 'inherit' });
}

packageSnippets();
versionRepository();
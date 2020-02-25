const path = require('path');
const { execSync } = require('child_process');

function packageSnippets() {
    const snippetDir = path.join(
        process.cwd(),
        '_workshop-assets',
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

module.exports = packageSnippets;
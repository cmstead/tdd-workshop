const { execSync } = require('child_process');
const packageSnippets = require('./build-snippets-extension');

console.log('\nInstalling project API dependencies...');
execSync('npm install', {
    cwd: './_project-api',
    stdio: 'inherit'
})

try{
    console.log('\nInstalling Yeoman...');
    execSync('npm install yo@latest -g', {
        stdio: "inherit"
    });    
} catch(e) {
    console.log('Yeoman failed to install. Try installing by hand.');
}

console.log('\nInstalling VS Code snippets extension...');
execSync('code --install-extension ./tdd-workshop-snippets.vsix', {
    cwd: "./_workshop-assets/tdd-workshop-snippets",
    stdio: "inherit"
});

console.log('\nLinking File generator...');
execSync('npm link ./', {
    cwd: "./_workshop-assets/generator-tdd-workshop",
    stdio: "inherit"
});

let devBranchExists = false;

try{
   devBranchExists = !execSync(
        'git show-ref --verify refs/heads/dev',
        { encoding: 'utf8' })
        .startsWith('fatal');
} catch(e) {
    console.log('No dev branch found, state is okay, continuing.')
}

console.log('\nPreparing git branches...');

execSync('git checkout master');

if (devBranchExists) {
    execSync('git branch -D dev');
}

execSync('git checkout -b dev');
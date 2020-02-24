const { execSync } = require('child_process');

console.log('\nInstalling project API dependencies...');
execSync('npm install', {
    cwd: './_project-api',
    stdio: 'inherit'
})

console.log('\nInstalling Yeoman...');
execSync('npm install yo@latest -g', {
    stdio: "inherit"
});

console.log('\nInstalling Dject CLI...');
execSync('npm install dject-cli@latest -g', {
    stdio: "inherit"
});

console.log('\nInstalling VS Code snippets extension...');
execSync('code --install-extension ./tdd-workshop-snippets.vsix', {
    cwd: "./_workshop-assets/tdd-workshop-snippets",
    stdio: "inherit"
});

console.log('\nLinking File generator...');
execSync('npm link ./', {
    cwd: "./_workshop-assets/generator-ts-tdd",
    stdio: "inherit"
});

const devBranchExists = !execSync(
    'git show-ref --verify refs/heads/dev',
    { encoding: 'utf8' })
    .startsWith('fatal');

console.log('\nPreparing git branches...');

execSync('git checkout master');

if (devBranchExists) {
    execSync('git branch -D dev');
}

execSync('git checkout -b dev');
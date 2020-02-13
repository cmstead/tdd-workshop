const { execSync } = require('child_process');

execSync('npm install yo@latest -g',{
    stdio: "inherit"
});

execSync('code --install-extension ./tdd-workshop-snippets.vsix', {
    cwd: "./_workshop-assets/tdd-workshop-snippets",
    stdio: "inherit"
});

execSync('npm link ./', {
    cwd: "./_workshop-assets/generator-ts-tdd",
    stdio: "inherit"
});

const devBranchExists = !execSync(
    'git show-ref --verify refs/heads/dev',
    { encoding: 'utf8' })
    .startsWith('fatal');

execSync('git checkout master');

if (devBranchExists) {
    execSync('git branch -D dev');
}

execSync('git checkout -b dev');
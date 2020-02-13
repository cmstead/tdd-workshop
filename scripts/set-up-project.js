const { execSync } = require('child_process');

execSync('code --install-extension ./tdd-workshop-snippets.vsix', {
    cwd: "./workshop-assets/tdd-workshop-snippets",
    stdio: "inherit"
});

execSync('npm link ./', {
    cwd: "./workshop-assets/generator-ts-tdd",
    stdio: "inherit"
});
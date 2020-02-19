const { execSync } = require('child_process');

const args = process.argv.slice(2);

const command = ['ts-node', './app.ts']
    .concat(args)
    .join(' ');

execSync(command, { 
    stdio: 'inherit',
    cwd: './app/'
});
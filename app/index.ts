import App from './src/App';

const args = process.argv.slice(2);

App.build({}).then(app => app.exec(args));

import DataModels from './src/data-models/_DataModels';
import App from './src/App';

const args = process.argv.slice(2);

DataModels
    .models()
    .then(function (models) {
        const app = new App(models);

        app.exec(args);
    });

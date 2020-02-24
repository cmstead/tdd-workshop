import container from './container';
import DataModels from './data-models/_DataModels';

function configureCli(models) {
    const modelsService = container.build('Models');
    modelsService.setModels(models);

    return container.build('Commands').register();
}

DataModels
    .models()
    .then(function (models) {
        configureCli(models).exec();
    });


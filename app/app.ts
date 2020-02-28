import container from './container';
import DataModels from './data-models/_DataModels';

function configureCli(models) {
    const modelsService = container.build('Models');
    modelsService.setModels(models);

    return container.build('CommandCLIRegistry').register();
}

DataModels
    .models()
    .then(function (models) {
        configureCli(models).exec();
    })
    .catch(function(error) {
        console.log('==========================');
        console.log('An application error occurred:\n');
        console.log(error)
        console.log('==========================');
    });


import CliBuilder from '../_project-api/CliBuilder/CliBuilder';
import DataModels from './data-models/_DataModels';

// Import commands here
import SampleCommand from './src/SampleCommand';


function configureCli(models) {
    const cliBuilder = CliBuilder.build();

    const sampleCommand = SampleCommand.build(models);

    return cliBuilder
        .registerCommand({
            name: 'sample',
            action: args => sampleCommand.exec(args)
        });
}

DataModels
    .models()
    .then(function (models) {
        configureCli(models).exec();
    });


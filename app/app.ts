import CliBuilder from '../_project-api/CliBuilder/CliBuilder';
import DataModels from './src/data-models/_DataModels';

// Import commands here
import SampleCommand from './src/SampleCommand';

const cliBuilder = CliBuilder.build();

function configureCli(models) {
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


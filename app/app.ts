import CliBuilder from '../_project-api/CliBuilder/CliBuilder';
import DataModels from './src/data-models/_DataModels';

import SampleCommand from './src/SampleCommand';

function configureCli(models) {
    const sampleCommand = SampleCommand.build(models);
    const cliBuilder = CliBuilder.build();

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


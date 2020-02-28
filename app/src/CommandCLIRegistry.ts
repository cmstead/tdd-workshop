import ICommand from '../types/ICommand';

const CliBuilder = require('clibuilder');
const Dject = require('dject/class/utilities/Dject');

class CommandCLIRegistry {
    static '@dependencies' = [
        'SampleCommand'
    ]

    public sampleCommand: ICommand;

    constructor(dependencyMap) {
        this.sampleCommand = dependencyMap.SampleCommand;
    }

    register() {
        return CliBuilder
            .build()
            .registerCommand({
                name: 'sample',
                action: (args: [any]) => this.sampleCommand.exec(args)
            });
    }

    static build(dependencies) {
        return Dject.build(CommandCLIRegistry, dependencies);
    }
}

export default Dject.prepareExport(CommandCLIRegistry);

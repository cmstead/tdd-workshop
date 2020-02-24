import CliBuilder from '../../_project-api/CliBuilder/CliBuilder';
import ICommand from '../types/ICommand';

const Dject = require('dject/class/utilities/Dject');

class Commands {
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
        return Dject.build(Commands, dependencies);
    }
}

export default Dject.prepareExport(Commands);
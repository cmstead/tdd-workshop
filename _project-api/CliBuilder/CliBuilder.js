const commandLineArgs = require('command-line-args');

module.exports = class CliBuilder {
    cliOptions;

    constructor() {
        this.cliOptions = {};
    }

    registerCommand(options) {
        if(typeof options.type === 'undefined') {
            options.type = Boolean;
        }

        this.cliOptions[options.name] = options;
        
        return this;
    }

    getDefaultAction(command) {
        const errorMessage = `No command '${command}' is defined.`;

        return function () {
            throw new Error(errorMessage);;
        }
    }

    getCommandAction(command) {
        const commandOptions = this.cliOptions[command];

        return typeof commandOptions !== 'undefined'
            ? commandOptions.action
            : this.getDefaultAction(command);
    }

    parseCommand() {
        const cliOptions = Object.values(this.cliOptions);
        const parsedCommand = commandLineArgs(cliOptions, { stopAtFirstUnknown: true });

        return Array.isArray(parsedCommand._unknown)
            ? parsedCommand._unknown
            : []
    }

    exec() {
        const [command = null, ...commandArgs] = this.parseCommand();

        this.getCommandAction(command)(commandArgs);
    }

    static build() {
        return new CliBuilder();
    }
}
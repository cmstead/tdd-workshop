const path = require('path');
const Generator = require('yeoman-generator');

var generatorList = require('../../package.json').files;

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    prompting() {
        var editedList = generatorList
            .slice(0)
            .filter(value => value !== 'app');

        const prompts = [
            {
                type: 'list',
                name: 'generator',
                message: 'please select a generator',
                choices: editedList
            }
        ];

        return this.prompt(prompts)
            .then((answers) =>
                this.composeWith("tdd-workshop:" + answers.generator, {}))
    }
}
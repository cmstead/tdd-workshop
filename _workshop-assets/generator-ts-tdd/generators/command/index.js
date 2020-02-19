const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    prompting() {

        const prompts = [
            {
                type: 'input',
                name: 'commandName',
                message: 'What do you want to call your command? ',
                validate: value => value.length > 2
            }
        ];

        return this.prompt(prompts)
            .then((responses) => {
                this.responses = responses;
            })
    }

    writing() {
        function toCamelCase(value) {
            return value[0].toLowerCase() + value.slice(1);
        }
        const commandTemplatePath = path.join(__dirname, 'templates', 'command.template.ts');
        const testTemplatePath = path.join(__dirname, 'templates', 'command.test.template.ts');
        const fileName = this.responses
            .commandName
            .split(/\s+/)
            .join('') + 
            '.ts';

        const commandPath = path.join(
            process.cwd(),
            'app',
            'src',
            fileName);
        
        const testPath = path.join(
            process.cwd(),
            'tests',
            fileName.replace('.ts', '.test.ts'));

        this.fs.copyTpl(
            this.templatePath(commandTemplatePath),
            this.destinationPath(commandPath),
            {
                commandName: this.responses.commandName,
                camelCaseCommandName: toCamelCase(this.responses.commandName)
            }
        );

        this.fs.copyTpl(
            this.templatePath(testTemplatePath),
            this.destinationPath(testPath),
            {
                commandName: this.responses.commandName,
                camelCaseCommandName: toCamelCase(this.responses.commandName)
            }
        );
    }
}
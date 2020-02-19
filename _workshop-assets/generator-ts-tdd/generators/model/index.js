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
                name: 'modelName',
                message: 'What do you want to call your model? ',
                validate: value => value.length > 2
            }
        ];

        return this.prompt(prompts)
            .then((responses) => {
                this.responses = responses;
            })
    }

    writing() {
        const templatePath = path.join(__dirname, 'templates', 'model.template.ts');
        const fileName = this.responses
            .modelName
            .split(/\s+/)
            .join('') + 
            '.ts';

        const testPath = path.join(
            process.cwd(),
            'app',
            'src',
            'data-models',
            fileName);

        this.fs.copyTpl(
            this.templatePath(templatePath),
            this.destinationPath(testPath),
            this.responses
        );
    }
}
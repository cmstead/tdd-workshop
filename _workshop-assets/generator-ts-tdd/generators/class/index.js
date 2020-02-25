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
                name: 'className',
                message: 'What do you want to call your class? ',
                validate: value => value.length > 2
            },
            {
                type: 'input',
                name: 'filePath',
                message: 'Where do you want to save your class? ',
                default: ''
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

        function isBaseDirectory(value) {
            const valueToken = value.trim();
            return valueToken === ''
                || valueToken === '.'
                || valueToken === './'
        }

        function getRelativeDepth(value) {
            if (isBaseDirectory(value)) {
                return './';
            } else {
                const pathTokens = value.split('/');
                let relativeDepth = '';

                do {
                    const nextToken = pathTokens.pop();

                    if(isBaseDirectory(nextToken)) {
                        break;
                    }

                    relativeDepth += '../';
                } while (pathTokens.length > 0)

                return relativeDepth;
            }
        }

        const classTemplatePath = path.join(__dirname, 'templates', 'class.template.ts');
        const testTemplatePath = path.join(__dirname, 'templates', 'class.test.template.ts');

        const fileName = this.responses
            .className
            .split(/\s+/)
            .join('') +
            '.ts';

        const classPath = path.join(
            process.cwd(),
            'app',
            'src',
            this.responses.filePath,
            fileName);

        const testPath = path.join(
            process.cwd(),
            'tests',
            this.responses.filePath,
            fileName.replace('.ts', '.test.ts'));

        this.fs.copyTpl(
            this.templatePath(classTemplatePath),
            this.destinationPath(classPath),
            {
                className: this.responses.className,
                camelCaseClassName: toCamelCase(this.responses.className)
            }
        );

        this.fs.copyTpl(
            this.templatePath(testTemplatePath),
            this.destinationPath(testPath),
            {
                className: this.responses.className,
                camelCaseClassName: toCamelCase(this.responses.className),
                relativeDepth: getRelativeDepth(this.responses.filePath)
            }
        );
    }
}
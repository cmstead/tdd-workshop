const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    prompting() {
        let config = {};
        
        try{
            const packagePath = path.join(process.cwd(), 'package.json');
            config = require(packagePath);
        } catch (e) {}

        const testDirectoryDefined = Boolean(config['test-directory']);

        const testDirectory = testDirectoryDefined
            ? config['test-directory']
            : './tests';

        const prompts = [
            {
                type: 'input',
                name: 'testDir',
                message: 'Where do you store your tests? ',
                default: testDirectory
            },
            {
                type: 'input',
                name: 'testPath',
                message: 'Subdirectory for your new test: ',
                default: './'
            },
            {
                type: 'input',
                name: 'behaviorName',
                message: 'What are you testing? ',
                validate: function (value) {
                    return value.trim() !== '';
                }
            }
        ];

        return this.prompt(prompts)
            .then((responses) => {
                this.responses = responses;
            })
    }

    writing() {
        const templatePath = path.join(__dirname, 'templates', 'test-file.template.ts');
        const fileName = this.responses
            .behaviorName
            .toLowerCase()
            .split(/\s+/)
            .join('-') + 
            '.test.ts';

        const testPath = path.join(
            process.cwd(),
            this.responses.testDir,
            this.responses.testPath,
            fileName);

        this.fs.copyTpl(
            this.templatePath(templatePath),
            this.destinationPath(testPath),
            {
                behaviorName: this.responses.behaviorName
            }
        );
    }
}
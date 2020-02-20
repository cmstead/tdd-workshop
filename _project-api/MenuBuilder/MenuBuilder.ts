

const inquirer = require('inquirer');

export default class MenuBuilder{
    private promptDefinitions: object[];

    constructor() {
        this.promptDefinitions = [];
    }

    static build() {
        return new MenuBuilder();
    }

    addTextInput({
        valueName,
        description,
        defaultValue = '',
        validator = () => true
    }) {
        this.promptDefinitions.push({
            type: 'input',
            name: valueName,
            message: description,
            default: () => defaultValue,
            validate: validator
        });
    }

    addEditorInput({
        valueName,
        description,
        validator = () => true
    }) {
        this.promptDefinitions.push({
            type: 'editor',
            name: valueName,
            message: description,
            validate: validator
        });
    }

    addListInput({
        valueName,
        description,
        choices = []
    }){
        this.promptDefinitions.push({
            type: 'list',
            name: valueName,
            message: description,
            choices: choices
        });
    }

    displayMenu() {
        return inquirer.prompt(this.promptDefinitions);
    }
}
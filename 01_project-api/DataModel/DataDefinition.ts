export default class DataDefinition {
    private type: string;
    private definition: any;

    constructor({
        type,
        definition
    }) {
        this.type = type;
        this.definition = definition;
    }

    isDefinitionOf(definitionType: 'array' | 'object' | 'value') {
        return this.type === definitionType;
    }

    private validateProperty(key, value) {
        if (typeof this.definition[key] === 'undefined') {
            throw new Error(`Unknown property.`);
        } else {
            this.definition[key].validate(value);
        }
    }

    private validateObject([key, value]) {
        try{
            this.validateProperty(key, value);
        } catch (e) {
            throw new Error(`Error at key ${key}: ${e.message}`);
        }
    }

    private validateValue(value) {
        if (this.type === 'value' || this.type === 'array') {
            this.definition.validate(value);
        } else {
            Object.entries(value)
                .forEach(entry => this.validateObject(entry));
        }
    }

    validate(value) {
        try{
            this.validateValue(value);
        } catch (e) {
            throw new Error(`Validation error: ${e.message}`);
        }
    }
}
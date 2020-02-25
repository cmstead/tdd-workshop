module.exports = class DataDefinition {
    type;
    definition;

    constructor({
        type,
        definition
    }) {
        this.type = type;
        this.definition = definition;
    }

    isDefinitionOf(definitionType) {
        return this.type === definitionType;
    }

    validateProperty(key, value) {
        if (typeof this.definition[key] === 'undefined') {
            throw new Error(`Unknown property.`);
        } else {
            this.definition[key].validate(value);
        }
    }

    validateObject([key, value]) {
        try{
            this.validateProperty(key, value);
        } catch (e) {
            throw new Error(`Error at key ${key}: ${e.message}`);
        }
    }

    validateValue(value) {
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
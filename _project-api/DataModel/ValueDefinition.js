module.exports = class ValueDefinition {
    type;
    validator;

    constructor({
        type,
        validate = () => true
    }) {
        this.type = type;
        this.validator = validate;
    }

    validate(value) {
        if (typeof value !== this.type) {
            throw new TypeError(`Expected type ${this.type}, but instead, got ${typeof value}`);
        }

        if (
            !this.validator(value)
        ) {
            throw new Error(`Value ${value} does not meet validation rules.`);
        }
    }
}
const DataDefinition = require("./DataDefinition");;
const ValueDefinition = require("./ValueDefinition");;

module.exports = class DefinitionUtils {
    static buildObjectDefinition(definition) {
        return Object
            .entries(definition)
            .reduce((result, [key, value]) => {
                result[key] = this.buildPropertyDefinition(value);
                return result;
            }, {});
    }

    static buildPropertyDefinition(definition) {
        if (typeof definition.type !== 'undefined') {
            return this.buildModelDefinition(
                'value',
                new ValueDefinition(definition)
            );
        } else {
            return definition;
        }
    }

    static buildModelDefinition(
        type,
        definition
    ) {
        return new DataDefinition({
            type: type,
            definition: definition
        });
    }
}
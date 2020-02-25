module.exports = class DataUtils{

    static objectToArray(values) {
        return Object.entries(values)
            .map(([key, value]) => ({
                key,
                value
            }));
    }

    static merge(destination, source = {}) {
        return Object.keys(source)
            .reduce(function (destination, key) {
                destination[key] = source[key];
                return destination;
            }, destination);
    }

    static mergeAllMatching(values, value, predicate) {
        return values
            .forEach((record) => {
                if (predicate(record)) {
                    this.merge(record, value);
                }
            });
    }

    static refValueToArray(values, name) {
        if (Array.isArray(values)) {
            return values;
        } else if (typeof values === 'object' && values !== null) {
            return DataUtils.objectToArray(values);
        } else {
            throw new TypeError(`Value at ${name} is not searchable.`);
        }
    }
}
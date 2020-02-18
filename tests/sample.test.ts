import App from '../src/App';
const { assert } = require('chai');

describe('Application Test', function () {

    it('works when run from the CLI', function () {
        assert.doesNotThrow(() => new App(null).exec([]));
    });

});
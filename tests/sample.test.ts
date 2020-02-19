import App from '../src/App';
const { assert } = require('chai');

describe('Application Test', function () {

    it('works when run from the CLI', function () {
        const app = new App(null);

        assert.doesNotThrow(() => app.exec());
    });

});
const { assert } = require('chai');
const stubcontractor = require('stubcontractor')({});
const sinon = require('sinon');

const JsonFileService = require('../../DataStore/JsonFileService');
const DataInterface = require('../../DataStore/DataInterface');

describe('Data Interface', function () {

    let jsonFileServiceFake;
    let buildDataInterface;

    beforeEach(function () {
        const jsonFileReader = JsonFileService.build({});

        jsonFileServiceFake = stubcontractor
            .buildApiFakeFromPrototype(jsonFileReader);

        buildDataInterface = function (readData = null) {
            const writeFileSpy = sinon.spy(() => null);
            jsonFileServiceFake.writeFileSpy = writeFileSpy;
            jsonFileServiceFake.readFile.onCall(() => readData);
            jsonFileServiceFake.writeFile.onCall(writeFileSpy);

            return DataInterface.build({
                jsonFileService: jsonFileServiceFake
            });
        }
    });

    describe('Read data from a JSON blob', function () {
        it('returns entire data blob when requested directly', function () {
            const dataInterface = buildDataInterface('stringData');

            const result = dataInterface.val();

            assert.equal(result, 'stringData');
        });

        it('returns data from data root when requested', function () {
            const dataInterface = buildDataInterface({ foo: 'bar' });

            const result = dataInterface.read('foo').val();

            assert.equal(result, 'bar');
        });

        it('returns data from ref when requested', function () {
            const dataInterface = buildDataInterface({
                foo: {
                    bar: ['baz', 'quux']
                }
            });

            const result = dataInterface
                .ref('foo')
                .read('bar')
                .val();

            assert.equal(result.toString(), 'baz,quux');
        });

        it('returns data from a deep ref when requested', function () {
            const dataInterface = buildDataInterface({
                foo: {
                    bar: {
                        baz: [1, 2, 3]
                    }
                }
            });

            const result = dataInterface
                .ref('foo/bar')
                .read('baz')
                .val();

            assert.equal(result.toString(), '1,2,3');
        });

        it('returns handles refs to data which doesn\'t exist', function () {
            const dataInterface = buildDataInterface({
                foo: {}
            });

            const result = dataInterface
                .ref('foo/bar')
                .read('baz')
                .val();

            assert.equal(result, null);
        });
    });

    describe('Set data into a JSON blob', function () {
        it('writes data to the data file from root ref on set', function () {
            const dataInterface = buildDataInterface();

            dataInterface.set({
                foo: 'bar'
            });

            const storedData = jsonFileServiceFake.writeFileSpy.args[0][0];
            assert.equal(JSON.stringify(storedData), '{"foo":"bar"}');
        });

        it('writes data to the data file from a deep ref on set', function () {
            const dataInterface = buildDataInterface({
                foo: {
                    bar: null
                }
            });

            dataInterface.ref('foo/bar/baz').set('quux');

            const storedData = jsonFileServiceFake.writeFileSpy.args[0][0];
            assert.equal(JSON.stringify(storedData), '{"foo":{"bar":{"baz":"quux"}}}');
        });
    });

    describe('Update in a JSON blob', function () {

        it('updates data in an existing object when written to', function () {
            const dataInterface = buildDataInterface({
                foo: {
                    bar: 'original',
                    baz: 'should not change'
                }
            });

            dataInterface.ref('foo').update({
                bar: 'updated'
            });

            const writeResult = jsonFileServiceFake.writeFileSpy.args[0][0];

            assert.equal(JSON.stringify(writeResult), '{"foo":{"bar":"updated","baz":"should not change"}}');
        });

        it('falls back to set when base is empty', function () {
            const dataInterface = buildDataInterface(null);

            dataInterface.update({
                bar: 'updated'
            });

            const writeResult = jsonFileServiceFake.writeFileSpy.args[0][0];

            assert.equal(JSON.stringify(writeResult), '{"bar":"updated"}');
        });

    });

    describe('Push value into ref', function() {
        it('pushes value into an existing array', function(){
            const dataInterface = buildDataInterface({ test: [] });

            dataInterface.ref('test').push({ test: 'value' });

            const writeResult = jsonFileServiceFake.writeFileSpy.args[0][0];

            assert.equal(JSON.stringify(writeResult), '{"test":[{"test":"value"}]}');
        });

        it('overwrites with array and pushes value into an existing array', function(){
            const dataInterface = buildDataInterface({ test: 'no' });

            dataInterface.ref('test').push({ test: 'value' });

            const writeResult = jsonFileServiceFake.writeFileSpy.args[0][0];

            assert.equal(JSON.stringify(writeResult), '{"test":[{"test":"value"}]}');
        });
    });

    describe('Delete value', function() {
        it('deletes am object from the store when provided a key', function(){
            const dataInterface = buildDataInterface({ test: { foo: 'bar' }});

            dataInterface.delete({ id: 'test' });

            const writeResult = jsonFileServiceFake.writeFileSpy.args[0][0];

            assert.equal(JSON.stringify(writeResult), '{}');
        });

        it('deletes an object from a ref in the store when provided a key', function(){
            const dataInterface = buildDataInterface({ test: { foo: ['bar'] }});

            dataInterface.ref('test').delete({ id: 'foo' });

            const writeResult = jsonFileServiceFake.writeFileSpy.args[0][0];

            assert.equal(JSON.stringify(writeResult), '{"test":{}}');
        });

        it('deletes an object from a ref in the store when provided a predicate', function(){
            const dataInterface = buildDataInterface({ test: { foo: ['bar'] }});

            dataInterface.ref('test').delete({
                predicate: (key, _) => key === 'foo'
            });

            const writeResult = jsonFileServiceFake.writeFileSpy.args[0][0];

            assert.equal(JSON.stringify(writeResult), '{"test":{}}');
        });

        it('deletes an object from an array ref in the store when provided a predicate', function(){
            const dataInterface = buildDataInterface({ test: { foo: ['bar', 'baz'] }});

            dataInterface.ref('test/foo').delete({
                predicate: (_, value) => value === 'baz'
            });

            const writeResult = jsonFileServiceFake.writeFileSpy.args[0][0];

            assert.equal(JSON.stringify(writeResult), '{"test":{"foo":["bar"]}}');
        });
    });
});
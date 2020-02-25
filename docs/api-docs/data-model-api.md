# Data Model System #

## Purpose ##

To provide a easier interface over storing JSON to the local filesystem.

The data models do not have a relational component, as such, relations must be managed by the software at run-time.

Data models DO have a contract definition system, which requires data shape to be pre-defined before interaction.

## API ##

### Setup ###

Every model must have a name and a data definition.  The setup looks like the following:

```typescript
// Import the base DataModel class for extension
const DataModel = require("datamodel");

// Be sure your model extends the base DataModel class
export default class Sample extends DataModel {
    constructor() {
        super();

        // Define the model name (used internally)
        this.name = 'Sample';

        // Set your data definition
        this.setDataDefinition(
            DataModel.Object({
                userInput: {
                    type: 'string'
                }
            })
        );
    }
}
```

**Static Methods**

The data definitions require model data definitions which are constructed within the data model system.  The following methods provide correctly instantiated data definitions:

- `DataModel.Array(SetupDefinition): DataDefinition` - A SetupDefinition is a bare object which contains two properties, like below:

```typescript
{
    type: typeName,
    validate?: (any) => boolean
}

/*
* The type name only supports types which are serializable into 
* a JSON string
*
* The "validate" function must be synchronous, and can validate 
* anything about the property being defined
*/
```

- `DataModel.Object(ObjectSetupDefinition): DataDefinition` - Creates an object data definition object, to guarantee object data stability. An ObjectSetupDefinition is a bare object with the following format:

```typescript
{
    [name: string]: SetupDefinition
}
```

- `DataModel.Value(SetupDefinition): ValueDefinition` - Creates a value data definition, which is used for ensuring only a single, type-specific value may be set into a model. This is relatively unlikely to be useful in isolation, but is used extensively internally.

### Data CRUD Methods ###

- Create
    - `models.Model.create(value: any): void` - Validates and creates a new value stored in your model
- Read
    - `models.Model.val(): any` - Reads out all model-related data (remember, this is JSON/Document data under the hood)
    - `models.Model.filter(predicate: (any) => boolean): any[]` - Only works on array and object data. Returns an array of data matching the predicate criteria
    - `models.Model.find((any) => boolean): any` - Only works on array and object data. Returns the first value which matches the predicate criteria
- Update
    - `models.Model.update(value: any, predicate?: (any) => boolean): void` - Update values in the model through a merge method. Only specify the properties which should be updated. Predicate function is required for array updates; it is ignored for all other updates.
- Delete
    - `models.Model.delete(predicate: (any) => boolean): void` - Deletes all values which conform to predicate criteria
    - `models.Model.deleteById(id: any): void` - deletes record which has an object key, or array index, which matches provided id

## Examples ##

Model setup:

```typescript
const DataModel = require("datamodel");

export default class Sample extends DataModel {
    constructor() {
        super();

        this.name = 'User';

        this.setDataDefinition(
            DataModel.Array({
                firstName: {
                    type: 'string',
                    validate: name => name.length > 1
                },
                lastName: {
                    type: 'string',
                    validate: name => name.length > 1
                },
                email: {
                    type: 'string',
                    validate: name => (/^\w+@\w+\.[a-z]{2,3}\.[a-z]{2,3}$/i).test(name);
                },
                mantra: {
                    type: 'string'
                }
            })
        );
    }
}
```

Create a new record:

```typescript
this.modelSet.User.create({
    firstName: 'Pat',
    lastName: 'Doe',
    email: 'pat.doe@example.com',
    mantra: 'Be the change you want to see.'
});
```

Update a record:

```typescript
const newMantra = {
    mantra: 'An eye for an eye leaves the whole world blind'
};

const isPat = (record) => 
    record.email === 'pat.doe@example.com';

this.modelSet.User.update(newMantra, isPat);
```

Read a single record:

```typescript
const isPat = (record) => 
    record.email.toLowerCase() === 'pat.doe@example.com';

const user = this.modelSet.User.find(isPat);
```

Read all matching records:

```typescript
const isPat = (record) => 
    record.firstName.toLowerCase() === 'pat';

const allUsersNamedPat = this.modelSet.User.filter(isPat);
```

Delete all matching records:

```typescript
const isPat = (record) => 
    record.email.toLowerCase() === 'pat.doe@example.com';

this.modelSet.User.delete(isPat);
```

Delete record by ID:

```typescript
const patUserRecordId = 0;

this.modelSet.User.deleteById(patUserRecordId);
```